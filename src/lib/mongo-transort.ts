import Transport from "winston-transport";
import { getDb } from "$lib/server/mongo";

interface MongoDBTransportOptions extends Transport.TransportStreamOptions {
  collectionName?: string;
}

export class MongoDBTransport extends Transport {
  private collectionName: string;

  constructor(opts: MongoDBTransportOptions) {
    super(opts);
    this.collectionName = opts.collectionName ?? "logs";
  }

  async log(info: any, callback: () => void) {
    try {
      const db = await getDb();
      await db.collection(this.collectionName).insertOne({
        level: info.level,
        message: info.message,
        timestamp: info.timestamp || new Date(),
        meta: info.meta || {},
      });
    } catch (error) {
      console.error("MongoDB logging failed:", error);
    }

    callback();
  }
}
