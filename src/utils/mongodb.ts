
// MongoDB utility functions for API requests
// This file creates browser-compatible functions that make API calls to your MongoDB

// Define API endpoint (replace with your actual API endpoint)
const API_BASE_URL = "https://your-api-endpoint.com/api";

// MongoDB connection simulation through API
export const connectToMongoDB = async () => {
  console.log("Connected to MongoDB through API!");
  return {
    collection: (collectionName: string) => getCollection(collectionName)
  };
};

export const disconnectFromMongoDB = async () => {
  console.log("Disconnected from MongoDB API");
  return true;
};

export const getCollection = async (collectionName: string) => {
  // Return collection-like object with MongoDB-compatible methods
  // These methods make API calls to your backend server
  return {
    findOne: async (query: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${collectionName}/findOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return result.data;
      } catch (error) {
        console.error("Error in findOne:", error);
        return null;
      }
    },
    
    insertOne: async (document: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${collectionName}/insertOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ document }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return { insertedId: result.insertedId };
      } catch (error) {
        console.error("Error in insertOne:", error);
        throw error;
      }
    },
    
    find: async (query: any = {}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${collectionName}/find`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return {
          toArray: async () => result.data
        };
      } catch (error) {
        console.error("Error in find:", error);
        return { toArray: async () => [] };
      }
    },
    
    updateOne: async (query: any, update: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${collectionName}/updateOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, update }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return { modifiedCount: result.modifiedCount };
      } catch (error) {
        console.error("Error in updateOne:", error);
        return { modifiedCount: 0 };
      }
    },
    
    deleteOne: async (query: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${collectionName}/deleteOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return { deletedCount: result.deletedCount };
      } catch (error) {
        console.error("Error in deleteOne:", error);
        return { deletedCount: 0 };
      }
    }
  };
};
