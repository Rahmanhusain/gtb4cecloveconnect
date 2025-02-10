import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

let isConnected = false; // Track the connection status

const connectDB = async () => {

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    isConnected = false;
  });
  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected!');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    isConnected = false;
  });

  if (isConnected) {
    // Use existing database connection
    console.log("Using existing database connection");
    return;
  }

  try {
    // Establish a new database connection
    await mongoose.connect(uri, clientOptions, {
      socketTimeoutMS: 45000, // Applies to all queries on this connection
      connectTimeoutMS: 30000,
    });
    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
