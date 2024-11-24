import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function initializeDatabase(mongoose: mongoose.Mongoose) {
  const db = mongoose.connection.db;
  
  // Create collections if they don't exist
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(col => col.name);

  if (!collectionNames.includes('blogs')) {
    await db.createCollection('blogs');
    console.log('Created blogs collection');
  }

  // Create indexes
  const Blog = mongoose.connection.collection('blogs');
  
  // Create text indexes for search functionality
  await Blog.createIndex(
    { title: 'text', content: 'text', tags: 'text' },
    { background: true }
  );

  // Create unique index on slug
  await Blog.createIndex(
    { slug: 1 },
    { unique: true, background: true }
  );

  console.log('Database initialization completed');
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB, // Explicitly specify database name
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then(async (mongoose) => {
      // Initialize database after connection
      await initializeDatabase(mongoose);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
