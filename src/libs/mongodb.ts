import mongoose from "mongoose";

// Check for environment variable
if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI environment variable is not defined. Using default connection string.");
}

// Define a default connection URI if not provided
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://webshop.r9u5k.mongodb.net/test";

// Cache the MongoDB connection to avoid creating multiple connections
let cachedConnection: typeof mongoose | null = null;

/**
 * Connects to MongoDB using the MONGODB_URI environment variable
 * Returns the mongoose connection object
 */
export const connectDB = async () => {
  // If connection already exists, return it
  if (cachedConnection) {
    console.log("Using existing MongoDB connection");
    return cachedConnection;
  }

  try {
    // Set mongoose options for better connection stability
    const options = {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    };

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    const connection = await mongoose.connect(MONGODB_URI, options);
    
    // Cache the connection for future use
    cachedConnection = connection;
    
    // Log success message
    console.log("MongoDB connected successfully");
    
    // Set up connection error handler
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      cachedConnection = null;
    });
    
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

// Export mongoose for convenience
export { mongoose };