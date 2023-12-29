import express from 'express';

const router = express.Router();

const discordWebhook = "https://discord.com/api/webhooks/1190069443238297752/0wL25czXU4Xv2tRBIPwIRJ2djEfEbLqhYhlKcFCmkFkCfq_blx7eD04a3GzLQDXOfiMz"

router.post("/submitForm", async (req, res) => {
    const discordMessage = req.body.formData;
    try {
        await fetch(discordWebhook, {
            method: 'POST',
            headers: { 'ContentType': 'application/json' },
            body: discordMessage
        });
        res.status(200).send("Song requested successfully");
    } catch (e) {
        console.error('Error sending message to Discord:', e);
        res.status(500).send('Error when requesting song. Try again!');
    }
})

export default router;