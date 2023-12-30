import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;