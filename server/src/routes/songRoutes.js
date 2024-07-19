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

router.post('/songs', async (req, res) => {
   try {
       const songData = req.body;
       const song = await Song.create(songData);
       console.log(`Song successfully saved - ${song.songName}`);
       res.status(201).json({ message: `Song successfully saved - ${song.songName}` });
   } catch (err) {
       console.error(err);
       res.status(400).json({ message: `Failed to create song`});
   }
});

router.delete('/songs/:mmid', async (req, res) => {
    try {
        const {mmid} = req.params;
        // Find song in the database
        const song = await Song.findOne({ mmid : mmid});

        // Song not found
        if (!song) {
            return res.status(404).json({ message: `Song not found`});
        }

        // Delete song
        await Song.deleteOne({ mmid : mmid});
        console.log(`Song successfully deleted - ${song.songName}`);
        res.status(200).json({ message: `Song successfully deleted - ${song.songName}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete song due to server error' });
    }
});

export default router;