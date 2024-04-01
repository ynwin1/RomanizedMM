import React from "react";
import songData from '../../lyricsJSON/MinShiTaeMyoh.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function MinShiTaeMyoh() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MinShiTaeMyoh;