import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGODB_URI);
const db = client.db();

export { db };
