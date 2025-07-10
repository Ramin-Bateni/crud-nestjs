import { setupDatabase } from "./e2e.setup";

export default async function () {
  // Start in-memory MongoDB and set MONGO_URI for all tests
  await setupDatabase();
}
