import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "nextjs_api_steps_books";

let clientPromise;

export async function getDatabase() {
  clientPromise ??= new MongoClient(uri).connect();
  const client = await clientPromise;
  return client.db(dbName);
}