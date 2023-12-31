import mongoose from "mongoose";
import {MongoDBConnectionError} from "../utils/Exceptions.js";

const connectDB = async (retries = 5, delay = 2000) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(err.message);
        if (retries === 0) {
            console.log(`Tried connecting to the database ${retries} times but failed.`);
            throw new MongoDBConnectionError("Failed to connect to the database");
        } else {
            console.log(`Retrying to connect to the database - ${retries - 1} tries left`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        }
    }
};

export default connectDB;