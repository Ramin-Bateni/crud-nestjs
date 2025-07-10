import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

export const setupDatabase = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  process.env.MONGO_URI = uri;
};

export const teardownDatabase = async () => {
  if (mongod) {
    await mongod.stop();
  }
};
