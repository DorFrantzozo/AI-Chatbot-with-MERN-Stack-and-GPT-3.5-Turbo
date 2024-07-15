import { connect, disconnect } from "mongoose";
async function connectToDb() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database" + error.message);
  }
}
async function disconnectFromDb() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to disconnect from database");
  }
}
export { disconnectFromDb, connectToDb };
