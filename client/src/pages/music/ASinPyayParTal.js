import React from "react";
import songData from '../../lyricsJSON/ASinPyayParTal.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function ASinPyayParTal() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default ASinPyayParTal;