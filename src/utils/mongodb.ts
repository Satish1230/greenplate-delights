
// This is a browser-compatible mock for MongoDB
// In a real app, you would use a backend API to interact with MongoDB

// Helper function to simulate database operations
const simulateDB = () => {
  // Get or initialize database
  const getDB = () => {
    const storedData = localStorage.getItem('mockMongoDB');
    return storedData ? JSON.parse(storedData) : { users: [] };
  };

  // Save database
  const saveDB = (data: any) => {
    localStorage.setItem('mockMongoDB', JSON.stringify(data));
  };

  return { getDB, saveDB };
};

// MongoDB connection simulation
export const connectToMongoDB = async () => {
  console.log("Connected to MongoDB simulation!");
  return {
    collection: (collectionName: string) => getCollection(collectionName)
  };
};

export const disconnectFromMongoDB = async () => {
  console.log("Disconnected from MongoDB simulation");
  return true;
};

export const getCollection = async (collectionName: string) => {
  const { getDB, saveDB } = simulateDB();
  
  // Create collection if it doesn't exist
  const db = getDB();
  if (!db[collectionName]) {
    db[collectionName] = [];
    saveDB(db);
  }
  
  // Return collection-like object with MongoDB-compatible methods
  return {
    findOne: async (query: any) => {
      const collection = getDB()[collectionName] || [];
      return collection.find((item: any) => {
        // Match all properties in the query
        return Object.keys(query).every(key => item[key] === query[key]);
      }) || null;
    },
    
    insertOne: async (document: any) => {
      const db = getDB();
      const collection = db[collectionName] || [];
      const id = `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newDocument = { ...document, _id: id };
      collection.push(newDocument);
      db[collectionName] = collection;
      saveDB(db);
      return { insertedId: id };
    },
    
    find: async (query: any = {}) => {
      const collection = getDB()[collectionName] || [];
      const matches = collection.filter((item: any) => {
        if (Object.keys(query).length === 0) return true;
        // Match all properties in the query
        return Object.keys(query).every(key => item[key] === query[key]);
      });
      return {
        toArray: async () => matches
      };
    },
    
    updateOne: async (query: any, update: any) => {
      const db = getDB();
      const collection = db[collectionName] || [];
      let modified = false;
      
      // Find and update the first matching document
      const updatedCollection = collection.map((item: any) => {
        if (!modified && Object.keys(query).every(key => item[key] === query[key])) {
          modified = true;
          // Apply $set operator
          if (update.$set) {
            return { ...item, ...update.$set };
          }
          return { ...item, ...update };
        }
        return item;
      });
      
      db[collectionName] = updatedCollection;
      saveDB(db);
      return { modifiedCount: modified ? 1 : 0 };
    },
    
    deleteOne: async (query: any) => {
      const db = getDB();
      const collection = db[collectionName] || [];
      const initialLength = collection.length;
      
      // Filter out the first matching document
      let deleted = false;
      const filteredCollection = collection.filter((item: any) => {
        if (deleted) return true;
        const shouldDelete = Object.keys(query).every(key => item[key] === query[key]);
        if (shouldDelete) deleted = true;
        return !shouldDelete;
      });
      
      db[collectionName] = filteredCollection;
      saveDB(db);
      return { deletedCount: initialLength - filteredCollection.length };
    }
  };
};
