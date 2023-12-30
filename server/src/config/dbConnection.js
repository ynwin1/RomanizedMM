import mongoose from "mongoose";

const connectDB = async (retries = 5, delay = 2000) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(err.message);
        if (retries === 0) {
            console.log(`Tried connecting to the database ${retries} but failed.`);
            process.exit(1);
        } else {
            console.log(`Retrying to connect to the database - ${retries - 1} tries left`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        }
    }
};

export default connectDB;