import express from 'express';
import Song from '../model/Song.js';

const router = express.Router();

// Search songs by name
router.get('/songs/search', async (req, res) => {
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    try {
        const searchTerm = escapeRegExp(req.query.term);
        const songs = await Song.find({ songName: new RegExp(searchTerm, 'i') });
        res.status(200).json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;