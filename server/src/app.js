import dotenv from 'dotenv';
dotenv.config( {path: "C:\\Users\\User\\OneDrive - UBC\\My Projects\\RomanizedMMMusic\\server\\.env" });
import express from 'express';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import formRoutes from "./routes/formRoutes.js";
import * as path from "path";
import { fileURLToPath } from 'url';

const createApp = () => {
    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.json());
    app.use(cors({
        origin: process.env.FRONTEND_URI
    }))
    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.use('/api', songRoutes);
    app.use('/api', formRoutes);

    return app;
}


export default createApp;

