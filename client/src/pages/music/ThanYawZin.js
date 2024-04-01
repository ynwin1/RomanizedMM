import React from "react";
import songData from '../../lyricsJSON/ThanYawZin.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function ThanYawZin() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default ThanYawZin;