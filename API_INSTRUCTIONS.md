
# MongoDB API Server Instructions

To make this application work with a real MongoDB database in production, you need to set up a simple backend API server. Here's how:

## Step 1: Create a new Node.js project for your API

```bash
mkdir greenplate-api
cd greenplate-api
npm init -y
npm install express mongodb cors dotenv
```

## Step 2: Create server.js file

```javascript
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String
const uri = process.env.MONGODB_URI || "mongodb+srv://satishpati96549:a8OEEUAwO1a4FKPj@cluster0.mongodb.net/greenplatedb?retryWrites=true&w=majority";

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connect();

// Generic collection endpoint creator
function createCollectionEndpoints(collectionName) {
  // Find One
  app.post(`/api/${collectionName}/findOne`, async (req, res) => {
    try {
      const { query } = req.body;
      const db = client.db("greenplatedb");
      const collection = db.collection(collectionName);
      const result = await collection.findOne(query);
      res.json({ data: result });
    } catch (error) {
      console.error(`Error in ${collectionName}/findOne:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Insert One
  app.post(`/api/${collectionName}/insertOne`, async (req, res) => {
    try {
      const { document } = req.body;
      const db = client.db("greenplatedb");
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(document);
      res.json({ insertedId: result.insertedId });
    } catch (error) {
      console.error(`Error in ${collectionName}/insertOne:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Find
  app.post(`/api/${collectionName}/find`, async (req, res) => {
    try {
      const { query } = req.body;
      const db = client.db("greenplatedb");
      const collection = db.collection(collectionName);
      const result = await collection.find(query).toArray();
      res.json({ data: result });
    } catch (error) {
      console.error(`Error in ${collectionName}/find:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update One
  app.post(`/api/${collectionName}/updateOne`, async (req, res) => {
    try {
      const { query, update } = req.body;
      const db = client.db("greenplatedb");
      const collection = db.collection(collectionName);
      const result = await collection.updateOne(query, update);
      res.json({ modifiedCount: result.modifiedCount });
    } catch (error) {
      console.error(`Error in ${collectionName}/updateOne:`, error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete One
  app.post(`/api/${collectionName}/deleteOne`, async (req, res) => {
    try {
      const { query } = req.body;
      const db = client.db("greenplatedb");
      const collection = db.collection(collectionName);
      const result = await collection.deleteOne(query);
      res.json({ deletedCount: result.deletedCount });
    } catch (error) {
      console.error(`Error in ${collectionName}/deleteOne:`, error);
      res.status(500).json({ error: error.message });
    }
  });
}

// Create endpoints for collections
createCollectionEndpoints('users');
// Add other collections as needed
// createCollectionEndpoints('meals');
// createCollectionEndpoints('orders');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle process termination
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
```

## Step 3: Create .env file (Optional)

```
PORT=5000
MONGODB_URI=mongodb+srv://satishpati96549:a8OEEUAwO1a4FKPj@cluster0.mongodb.net/greenplatedb?retryWrites=true&w=majority
```

## Step 4: Deploy your API

You can deploy this API to platforms like:
- Vercel
- Netlify
- Heroku
- Railway
- Render

## Step 5: Update the frontend

In your frontend code, update the `API_BASE_URL` in `src/utils/mongodb.ts` to point to your deployed API:

```javascript
const API_BASE_URL = "https://your-deployed-api.com/api";
```

## Security Considerations

1. Set up proper authentication for your API
2. Use environment variables for sensitive information
3. Never expose your MongoDB credentials in client-side code
4. Set up proper CORS configuration to only allow requests from your frontend domain
