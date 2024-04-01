import React from "react";
import songData from '../../lyricsJSON/MoeMaKhaEainMatKhayanPyar.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function MoeMaKhaEainMatKhayanPyar() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default MoeMaKhaEainMatKhayanPyar;