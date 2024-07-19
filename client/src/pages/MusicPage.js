import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";
import {Helmet} from "react-helmet";

const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
const API_URL = process.env.REACT_APP_SEARCH_SONG_API;

function MusicPage() {
    const { songName } = useParams();
    const [song, setSong] = useState(null);

    // for when user directly navigates to a song page/refreshes
    useEffect(() => {
        // add space after every capital letter in song name
        const songNameFormatted = songName.replace(/([A-Z])/g, ' $1').trim();
        fetchSongData(songNameFormatted).then(data => setSong(data));
    }, [songName]);

    // return null while waiting for song data (nothing really happens)
    if (!song) {
        return null;
    }

    const songNameSplit = song.songName.split('(')[0];
    // Remove space from song name and rejoin them
    const fullURL = `https://www.romanizedmm.com/song/${songNameSplit.split(" ").join("")}`;

    return (
        <div>
            <Helmet>
                <title>{song.songName} - {song.artistName}</title>
                <meta
                    name="description"
                    content={`${songNameSplit}Lyrics - ${song.artistName}, ${song.lyrics.slice(0, 250) + "..."}`}
                />
                <link rel="canonical" href={fullURL}/>
            </Helmet>
            <MusicBox song={song} />
            <Footer />
        </div>
    );
}

async function fetchSongData(songName) {
    const response  = await fetch(SERVER_URL + API_URL + `?term=${songName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data[0];
}

export default MusicPage;