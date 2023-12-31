import express from 'express';
const router = express.Router();

router.post("/submitForm", async (req, res) => {
    const discordWebhook = process.env.DISCORD_WEBHOOK;
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
            throw new Error(`${response.status}`);
        }
        res.status(200).json({ message: "Song requested successfully ✅. Stay tuned! 🤩" });
    } catch (e) {
        console.error('Error sending message to Discord:', e.message);
        res.status(500).json({ message: 'Oops! there was an error 😩. Please try again! 🙏🏻' });
    }
})

export default router;