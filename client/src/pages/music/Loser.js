import React from "react";
import songData from '../../lyricsJSON/Loser.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function Loser() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default Loser;