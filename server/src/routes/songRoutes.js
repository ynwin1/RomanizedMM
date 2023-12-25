import express from 'express';
import Song from '../model/Song.js';

const router = express.Router();

// Search songs by name
router.get('/songs/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const songs = await Song.find({ name: new RegExp(searchTerm, 'i') });
        res.json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;