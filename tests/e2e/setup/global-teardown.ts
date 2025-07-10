import { teardownDatabase } from "./e2e.setup";

export default async function () {
  // Stop in-memory MongoDB after all tests finish
  await teardownDatabase();
}
