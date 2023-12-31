import express from 'express';
import {SongNameMissingError, WebhookSendError} from "../utils/Exceptions.js";
const router = express.Router();

function validateFormData(formData) {
    if (!formData.songName) {
        throw new SongNameMissingError("Please provide a song name!");
    }
}
router.post("/submitForm", async (req, res) => {
    const tryAgainMessage = 'Oops! there was an error 😩. Please try again! 🙏🏻';

    const discordWebhook = process.env.DISCORD_WEBHOOK;
    if (!discordWebhook) {
        console.error('Discord webhook URL is not set');
        return res.status(500).json({ message: tryAgainMessage });
    }

    const formData = req.body.formData;
    try {
        validateFormData(formData);
        const discordMessage = {
            content: `Song Name: ${formData.songName}\nArtist: ${formData.artist}\nYouTube Link: ${formData.youtubeLink}\nDetails: ${formData.details}`
        };
        const response = await fetch(discordWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordMessage)
        });
        if (!response.ok) {
            throw new WebhookSendError(`Sending to webhook failed with ${response.status} error`);
        }
        res.status(200).json({ message: "Song requested successfully ✅. Stay tuned! 🤩" });
    } catch (e) {
        console.error('Error sending message to Discord:', e.message);
        res.status(e.status || 500).json({ message: tryAgainMessage});
    }
})

export default router;