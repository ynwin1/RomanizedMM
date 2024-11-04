import express from 'express';
import {ReportMissingError, SongNameMissingError, WebhookSendError} from "../utils/Exceptions.js";
import SongRequest from "../model/SongRequest.js";
const router = express.Router();

const tryAgainMessage = 'Oops! there was an error 😩. Please try again! 🙏🏻';

async function sendToDiscord(webhookUrl, discordMessage) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
    });
    if (!response.ok) {
        throw new WebhookSendError(`Sending to webhook failed with ${response.status} error`);
    }
}

router.post("/submitForm", async (req, res) => {
    function validateRequestFormData(formData) {
        if (!formData.songName) {
            throw new SongNameMissingError("Please provide a song name!");
        }
        if (!formData.artist) {
            throw new Error("Please provide an artist name!");
        }
    }

    const discordWebhook = process.env.DISCORD_WEBHOOK;
    if (!discordWebhook) {
        console.error('Discord webhook URL is not set');
        return res.status(500).json({ message: tryAgainMessage });
    }

    const formData = req.body.formData;
    try {
        validateRequestFormData(formData);
        const discordMessage = {
            content: `Song Name: ${formData.songName}\nArtist: ${formData.artist}\nYouTube Link: ${formData.youtubeLink}\nDetails: ${formData.details}`
        };
        // Save the song request to the database
        const songRequest = await SongRequest.create(formData);
        console.log(`Song request saved - ${songRequest.songName}`);
        await sendToDiscord(process.env.DISCORD_WEBHOOK, discordMessage);
        console.log('Message sent to Discord successfully');
        res.status(201).json({ message: "Song requested successfully ✅. It may take 1-2 days, so stay tuned! 🤩" });
    } catch (e) {
        console.error('Error sending message to Discord:', e.message);
        res.status(e.status || 500).json({ message: tryAgainMessage});
    }
})

router.get("/songrequests", async (req, res) => {
    try {
        const songRequests = await SongRequest.find();
        res.status(200).json(songRequests);
    } catch (e) {
        console.error('Error fetching song requests:', e.message);
        res.status(500).json({ message: 'Failed to fetch song requests' });
    }
});

router.post("/submitReport", async (req, res) => {
    function validateReportFormData(formData) {
        if (!formData.report || formData.report.trim() === '') {
            throw new ReportMissingError("Please provide a report or a suggestion!");
        }
    }

    const discordWebhook = process.env.DISCORD_REPORT_WEBHOOK;
    if (!discordWebhook) {
        console.error('Discord webhook URL is not set');
        return res.status(500).json({ message: tryAgainMessage });
    }

    const formData = req.body.formData;
    try {
        validateReportFormData(formData);
        const discordMessage = {
            content: `Song Name: ${formData.songName}\nArtist: ${formData.artist}\nReport/Suggestion: ${formData.report}`
        };
        await sendToDiscord(process.env.DISCORD_REPORT_WEBHOOK, discordMessage);
        res.status(200).json({ message: "Report/Suggestion submitted successfully ✅. Thank you!" });
    } catch (e) {
        console.error('Error sending message to Discord:', e.message);
        res.status(e.status || 500).json({ message: tryAgainMessage});
    }
})

export default router;