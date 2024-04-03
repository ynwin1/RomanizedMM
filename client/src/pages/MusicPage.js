import React from "react";
import { useParams } from "react-router-dom";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";

function MusicPage() {
    const { songName } = useParams();
    const songData = require(`../lyricsJSON/${songName}.json`);

    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MusicPage;
