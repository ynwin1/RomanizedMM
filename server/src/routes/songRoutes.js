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

router.post('songs/addSong', async (req, res) => {
   try {
       const songData = req.body;
       const song = Song.create(songData);
       res.status(201).json({ message: `Song successfully saved - ${song}` });
   } catch (err) {
       console.error(err);
       res.status(400).json({ message: `Failed to create song - ${err.message}`});
   }
});

export default router;