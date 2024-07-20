import dotenv from 'dotenv';
dotenv.config( {path: "C:\\Users\\User\\OneDrive - UBC\\My Projects\\RomanizedMMMusic\\server\\.env" });
import express from 'express';
import cors from 'cors';
import {preRender} from "./ssr/prerender.js";
import isBot from "../src/ssr/botcheck.js"
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

    // Serve SSR content to bots

    app.get('*', async (req, res, next) => {
        // only for bots that crawl
        const userAgent = req.headers['user-agent'];
        if (isBot(userAgent)) {
            console.log('Bot detected, rendering static page:', userAgent);
            const html = await preRender(req.url);
            return res.status(200).send(html);
        } else {
            next();
        }
    });

    return app;
}


export default createApp;

