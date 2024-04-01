import React from "react";
import songData from '../../lyricsJSON/SaungTwinNway.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function SaungTwinNway() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default SaungTwinNway;