import mongoose from "mongoose";

const SongRequestSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    }
});

const SongRequest = mongoose.model('SongRequest', SongRequestSchema);

export default SongRequest;

