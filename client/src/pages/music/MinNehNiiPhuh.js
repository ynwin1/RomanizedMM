import React from "react";
import songData from '../../lyricsJSON/MinNehNiiPhuh.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function MinNehNiiPhuh() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MinNehNiiPhuh;