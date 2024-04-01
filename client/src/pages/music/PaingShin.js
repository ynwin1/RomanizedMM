import React from "react";
import songData from '../../lyricsJSON/PaingShin.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function PaingShin() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default PaingShin;