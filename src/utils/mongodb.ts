
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://satishpati96549:a8OEEUAwO1a4FKPj@cluster0.mongodb.net/greenplatedb?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connectToMongoDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("greenplatedb");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const disconnectFromMongoDB = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

export const getCollection = async (collectionName: string) => {
  const db = await connectToMongoDB();
  return db.collection(collectionName);
};
