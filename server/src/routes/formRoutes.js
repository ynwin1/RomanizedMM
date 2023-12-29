import express from 'express';

const router = express.Router();

const discordWebhook = "https://discord.com/api/webhooks/1190069443238297752/0wL25czXU4Xv2tRBIPwIRJ2djEfEbLqhYhlKcFCmkFkCfq_blx7eD04a3GzLQDXOfiMz"

router.post("/submitForm", async (req, res) => {
    const formData = req.body.formData;
    const discordMessage = {
        content: `Song Name: ${formData.songName}\nArtist: ${formData.artist}\nYouTube Link: ${formData.youtubeLink}\nDetails: ${formData.details}`
    };
    try {
        const response = await fetch(discordWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordMessage)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        res.status(200).json({ message: "Song requested successfully. Stay tuned!" });
    } catch (e) {
        console.error('Error sending message to Discord:', e);
        res.status(500).json({ message: 'Error when requesting song. Try again!' });
    }
})

export default router;