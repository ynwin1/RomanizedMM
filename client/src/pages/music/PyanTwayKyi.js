import React from "react";
import songData from '../../lyricsJSON/PyanTwayKyi.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function PyanTwayKyi() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default PyanTwayKyi;