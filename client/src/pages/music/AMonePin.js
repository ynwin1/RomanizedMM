import React from "react";
import songData from '../../lyricsJSON/AMonePin.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function AMonePin() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default AMonePin;