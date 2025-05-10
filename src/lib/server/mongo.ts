// src/lib/server/mongo.ts
import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const uri = env.MONGODB_URI!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db("svelte-auth");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
