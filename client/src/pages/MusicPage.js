import React from "react";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";
import { SongContext } from "../SongContext";
import {Helmet} from "react-helmet";

function MusicPage() {
    const { selectedSong } = React.useContext(SongContext);

    const songNameSplit = selectedSong.songName.split('(');

    return (
        <div>
            <Helmet>
                <title>{selectedSong.songName} - {selectedSong.artistName}</title>
                <meta
                    name="description"
                    content={`${songNameSplit[0]}Lyrics - ${selectedSong.artistName}, ${selectedSong.lyrics.slice(0, 250) + "..."}`}
                />
            </Helmet>
            <MusicBox song={selectedSong} />
            <Footer />
        </div>
    );
}

export default MusicPage;