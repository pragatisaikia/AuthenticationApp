import mongoose  from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    try {
        const mongod = await MongoMemoryServer.create();
        const getUri = mongod.getUri();
        const db = await mongoose.connect(getUri);
        console.log("Database connected");
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Rethrow the error to indicate connection failure
    }
}


export default connect