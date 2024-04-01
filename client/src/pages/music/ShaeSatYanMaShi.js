import React from "react";
import songData from '../../lyricsJSON/ShaeSatYanMaShi.json';
import MusicBox from '../../components/MusicBox/MusicBox';
import Footer from "../../components/Footer/Footer";

function ShaeSatYanMaShi() {
    return (
        <div>
            <MusicBox song={songData} />
            <Footer />
        </div>
    );
}

export default ShaeSatYanMaShi;