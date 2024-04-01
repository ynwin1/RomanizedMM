import React from "react";
import songData from '../../lyricsJSON/MinAtwatNgar.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function MinAtwatNgar() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MinAtwatNgar;