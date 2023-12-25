import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spotifyTrackId: {
        type: String,
        required: true
    },
    spotifyLink: String,
    youtubeLink: String,
    lyrics: {
        type: String,
        required: true
    }
});

const Song = mongoose.model('Song', SongSchema);

export default Song;