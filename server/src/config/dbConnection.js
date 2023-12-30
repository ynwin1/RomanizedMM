import mongoose from "mongoose";

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

// async function connectDB(retries = 5) {
//     while (retries > 0) {
//         try {
//             await mongoose.connect(process.env.MONGODB_URI);
//             console.log('MongoDB connected successfully!');
//             break; // Break out of the loop on successful connection
//         } catch (err) {
//             retries--;
//             console.log(`Retrying to connect to the database - ${retries} tries left`);
//             if (retries === 0) throw err; // Rethrow the last error after exhausting retries
//         }
//     }
// }

export default connectDB;