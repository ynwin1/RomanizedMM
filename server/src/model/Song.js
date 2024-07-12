import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    mmid: {
        type: Number,
        required: true
    },
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
    imageLink: String,
    about: {
        type: String,
        required: true
    },
    whenToListen: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    romanized: {
        type: String,
        required: true
    },
    burmese: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    }
});

const Song = mongoose.model('Song', SongSchema);

export default Song;