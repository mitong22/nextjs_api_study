// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
// const dbName = process.env.MONGODB_DB || "nextjs_components";

// let clientPromise;

// export async function getDatabase() {
//   clientPromise ??= new MongoClient(uri).connect();
//   const client = await clientPromise;
//   return client.db(dbName);
// }

import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB ?? "nextjs_components";

async function getClient() {
  if (!globalThis.nextjsComponentsMongoClientPromise) {
    const client = new MongoClient(uri);
    globalThis.nextjsComponentsMongoClientPromise = client.connect();
  }

  return globalThis.nextjsComponentsMongoClientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(dbName);
}