import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    albumName: String,
    genre: {
        type: String,
        required: true
    },
    spotifyTrackId: String,
    spotifyLink: String,
    appleMusicLink: String,
    youtubeLink: String,
    about: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    }
});

const Song = mongoose.model('Song', SongSchema);

export default Song;