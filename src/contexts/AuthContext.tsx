
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { getCollection, disconnectFromMongoDB } from '@/utils/mongodb';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  checkUserExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Fallback to localStorage if MongoDB connection fails
const saveMockData = (users: any[]) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

// Load mock data from localStorage
const loadMockData = () => {
  const storedUsers = localStorage.getItem('mockUsers');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [useMockDb, setUseMockDb] = useState<boolean>(false);
  const [mockUsers, setMockUsers] = useState<any[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }

    // Load mock data
    const mockData = loadMockData();
    setMockUsers(mockData);

    // Test MongoDB connection
    const testConnection = async () => {
      try {
        await getCollection('users');
        setUseMockDb(false);
        console.log("Using MongoDB for authentication");
      } catch (error) {
        console.error("MongoDB connection failed, using mock data:", error);
        setUseMockDb(true);
      }
    };

    testConnection();

    // Clean up MongoDB connection on unmount
    return () => {
      disconnectFromMongoDB().catch(console.error);
    };
  }, []);

  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      if (useMockDb) {
        return mockUsers.some(user => user.email === email);
      }

      const usersCollection = await getCollection('users');
      const user = await usersCollection.findOne({ email });
      return !!user;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      
      // Fallback to mock data
      return mockUsers.some(user => user.email === email);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      let foundUser;
      
      if (useMockDb) {
        foundUser = mockUsers.find(user => user.email === email);
      } else {
        const usersCollection = await getCollection('users');
        foundUser = await usersCollection.findOne({ email });
      }
      
      // Check if user exists and password matches
      if (foundUser && foundUser.password === password) {
        const userData = {
          id: foundUser._id || foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          isLoggedIn: true,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        toast({
          title: "Login Successful",
          description: "Welcome back to GreenPlate!",
        });
        return true;
      }
      
      // If user not found or password doesn't match
      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "User not registered. Please sign up first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const userExists = await checkUserExists(email);
      
      if (userExists) {
        toast({
          title: "Registration Failed",
          description: "User with this email already exists",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user object
      const newUser = {
        name,
        email,
        phone,
        password,
        createdAt: new Date(),
      };
      
      // Save to database or mock storage
      if (useMockDb) {
        // Generate an ID
        const id = `user-${Math.floor(Math.random() * 10000)}`;
        const userWithId = { ...newUser, id };
        
        // Update mock users array
        const updatedUsers = [...mockUsers, userWithId];
        setMockUsers(updatedUsers);
        saveMockData(updatedUsers);
        
        // Set user data for frontend
        const userData = {
          id,
          name,
          email,
          phone,
          isLoggedIn: true,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Save to MongoDB
        const usersCollection = await getCollection('users');
        const result = await usersCollection.insertOne(newUser);
        
        // Set user data for frontend
        const userData = {
          id: result.insertedId.toString(),
          name,
          email,
          phone,
          isLoggedIn: true,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      toast({
        title: "Registration Successful",
        description: "Welcome to GreenPlate! You can now subscribe to meal plans.",
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, checkUserExists }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
