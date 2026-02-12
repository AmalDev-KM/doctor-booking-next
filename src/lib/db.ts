import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI || MONGODB_URI === "") {
  throw new Error("Please define MONGODB_URI in .env.local");
}

/*
  Define cache interface
*/
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/*
  Extend Node global type
*/
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/*
  Initialize cache
*/
const cache: MongooseCache =
  global.mongooseCache ?? { conn: null, promise: null };

export async function connectDB(): Promise<Mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI);
  }

  cache.conn = await cache.promise;
  global.mongooseCache = cache;

  return cache.conn;
}
