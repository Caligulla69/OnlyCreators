const mongoose = require("mongoose");

/**
 * Cached connection promise for serverless environments (Vercel).
 *
 * In serverless, each cold start re-imports modules, but the global scope
 * persists across warm invocations within the same container.
 *
 * Instead of using a fragile polling-based wait with setInterval, we cache
 * the connection *promise* itself. If multiple requests arrive concurrently
 * during a cold start, they all await the same promise — no races, no polling.
 */
let cachedConnectionPromise = null;

const connectDB = async () => {
  // If we already have a ready connection, reuse it immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If a connection attempt is already in flight, piggyback on it
  // instead of starting a duplicate connection
  if (cachedConnectionPromise) {
    try {
      await cachedConnectionPromise;
      if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
      }
    } catch {
      // Previous attempt failed — fall through to retry below
      cachedConnectionPromise = null;
    }
  }

  // Start a new connection attempt and cache the promise
  cachedConnectionPromise = (async () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI environment variable is not set. " +
          "Please configure it in your Vercel project settings or .env file. " +
          "You can get a free MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas",
      );
    }

    // Mongoose options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Buffer commands until connection is established
      bufferCommands: true,
      // Keep the connection pool small for serverless
      maxPoolSize: 10,
      minPoolSize: 0,
      // Close idle connections faster in serverless
      maxIdleTimeMS: 10000,
    };

    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);

    return conn.connection;
  })();

  try {
    const connection = await cachedConnectionPromise;

    // Handle connection events (only wire these up once)
    if (!mongoose.connection._hasCustomListeners) {
      mongoose.connection._hasCustomListeners = true;

      mongoose.connection.on("error", (err) => {
        console.error(`❌ MongoDB connection error: ${err.message}`);
        // Invalidate the cached promise so the next request retries
        cachedConnectionPromise = null;
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠️  MongoDB disconnected");
        cachedConnectionPromise = null;
      });

      mongoose.connection.on("reconnected", () => {
        console.log("✅ MongoDB reconnected successfully");
      });
    }

    return connection;
  } catch (error) {
    // Invalidate so subsequent requests can retry
    cachedConnectionPromise = null;
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
