import React from "react";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";
import { SongContext } from "../SongContext";

function MusicPage() {
    const { selectedSong } = React.useContext(SongContext);

    return (
        <div>
            <MusicBox song={selectedSong} />
            <Footer />
        </div>
    );
}

export default MusicPage;
