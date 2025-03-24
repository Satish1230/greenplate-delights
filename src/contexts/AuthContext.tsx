
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

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

// This is a mock database function to simulate MongoDB operations
// In a real app, you would use actual MongoDB client connection
const mockDb = {
  users: [] as Array<{id: string, name: string, email: string, phone: string, password: string}>,
  
  async findUserByEmail(email: string) {
    return this.users.find(user => user.email === email);
  },
  
  async registerUser(name: string, email: string, phone: string, password: string) {
    const id = `user-${Math.floor(Math.random() * 10000)}`;
    const newUser = { id, name, email, phone, password };
    this.users.push(newUser);
    return newUser;
  }
};

// Load mock data from localStorage
const loadMockData = () => {
  const storedUsers = localStorage.getItem('mockUsers');
  if (storedUsers) {
    mockDb.users = JSON.parse(storedUsers);
  }
};

// Save mock data to localStorage
const saveMockData = () => {
  localStorage.setItem('mockUsers', JSON.stringify(mockDb.users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Load mock data on component mount
    loadMockData();
    
    // Check if user data exists in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const checkUserExists = async (email: string): Promise<boolean> => {
    const user = await mockDb.findUserByEmail(email);
    return !!user;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Find user by email
    const foundUser = await mockDb.findUserByEmail(email);
    
    // Check if user exists and password matches
    if (foundUser && foundUser.password === password) {
      const userData = {
        id: foundUser.id,
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
        description: "Welcome back to Mealawe!",
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
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = await mockDb.findUserByEmail(email);
    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "User with this email already exists",
        variant: "destructive",
      });
      return false;
    }
    
    // Register new user
    const newUser = await mockDb.registerUser(name, email, phone, password);
    
    // Save mock data
    saveMockData();
    
    // Auto-login after successful registration
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      isLoggedIn: true,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Registration Successful",
      description: "Welcome to Mealawe! You can now subscribe to meal plans.",
    });
    
    return true;
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
