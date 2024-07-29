import dotenv from 'dotenv';
dotenv.config( {path: "C:\\Users\\User\\OneDrive - UBC\\My Projects\\RomanizedMMMusic\\server\\.env" });
import express from 'express';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import formRoutes from "./routes/formRoutes.js";

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: process.env.FRONTEND_URI
    }));

    app.use('/api', songRoutes);
    app.use('/api', formRoutes);

    return app;
}


export default createApp;

