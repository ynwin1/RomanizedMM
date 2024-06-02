import React from "react";
import { useParams } from "react-router-dom";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";

function MusicPage() {
    const { songName } = useParams();
    const songData = require(`../lyricsJSON/${songName}.json`);

    return (
        <div>
            <Helmet>
                <title>{songData.songName} - {songData.artistName}</title>
                <meta
                    name="description"
                    content={`${songData.songName} - ${songData.artistName}, ${songData.lyrics.slice(0, 250) + "..."}`}
                />
            </Helmet>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MusicPage;
