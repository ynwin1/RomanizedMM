import dotenv from 'dotenv';
//TODO - can use relative path?
dotenv.config( {path: "C:\\Users\\User\\OneDrive - UBC\\My Projects\\RomanizedMMMusic\\server\\.env" });

import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import songRoutes from './routes/songRoutes.js';
import formRoutes from "./routes/formRoutes.js"

console.log(process.env);

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URI
}))

app.use('/api', songRoutes);
app.use('/api', formRoutes);

const PORT = process.env.PORT || 4321;
try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (e) {
    console.log(`Failed to establish mongo connection ${e}`);
}