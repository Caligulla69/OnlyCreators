const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/onlycreators";
    let usingMemoryServer = false;

    try {
      // First, try connecting to the configured MongoDB URI
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 45000,
      });

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`   Database: ${conn.connection.name}`);
    } catch (initialError) {
      // If local MongoDB isn't available, fall back to in-memory server
      console.warn(`⚠️  Could not connect to MongoDB at ${mongoURI}`);
      console.log(
        "📦 Starting in-memory MongoDB server (mongodb-memory-server)...",
      );

      try {
        const { MongoMemoryServer } = require("mongodb-memory-server");
        const mongoServer = await MongoMemoryServer.create();
        mongoURI = mongoServer.getUri();
        usingMemoryServer = true;

        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });

        console.log(`✅ In-Memory MongoDB Connected`);
        console.log(`   URI: ${mongoURI}`);
        console.log(`   ⚠️  Data will NOT persist between restarts.`);
        console.log(`   💡 Install MongoDB locally for persistent data.`);

        // Store reference for cleanup
        process.mongoServer = mongoServer;
      } catch (memoryServerError) {
        console.error(
          "❌ Failed to start in-memory MongoDB server:",
          memoryServerError.message,
        );
        console.error("\n💡 To fix this, install MongoDB locally:");
        console.error(
          "   Ubuntu/Mint: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/",
        );
        console.error(
          "   Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest\n",
        );
        process.exit(1);
      }
    }

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      if (!usingMemoryServer) {
        console.warn("⚠️  MongoDB disconnected. Attempting to reconnect...");
      }
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected successfully");
    });

    return mongoose.connection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
