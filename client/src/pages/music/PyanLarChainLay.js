import React from "react";
import songData from '../../lyricsJSON/PyanLarChainLay.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function PyanLarChainLay() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default PyanLarChainLay;