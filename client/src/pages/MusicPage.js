import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicBox from "../components/MusicBox/MusicBox";
import Footer from "../components/Footer/Footer";
import {Helmet} from "react-helmet";

const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
const API_URL = process.env.REACT_APP_SEARCH_SONG_API;

function MusicPage() {
    const { songName } = useParams();

    // previous fetch style
    const song = require(`../lyricsJSON/${songName}.json`);
    const songNameSplit = song.songName.split('(')[0];
    // Remove space from song name and rejoin them
    const fullURL = `https://www.romanizedmm.com/song/${songNameSplit.split(" ").join("")}`;

    // API Song Fetch
    // const [song, setSong] = useState(null);
    // useEffect(() => {
    //     const songNameFormatted = formatSongName(songName);
    //     fetchSongData(songNameFormatted).then(data => setSong(data));
    // }, [songName]);
    //
    // if (!song) {
    //     return null;
    // }
    //
    // const songNameSplit = song.songName.split('(')[0].split(" ").join("");
    // const fullURL = generateFullURL(songNameSplit);
    // function formatSongName(name) {
    //     return name.replace(/([A-Z])/g, ' $1').trim();
    // }
    //
    // function generateFullURL(name) {
    //     return `https://www.romanizedmm.com/song/${songNameSplit}`;
    // }

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
            <div className="notification">
                <h1>
                    In a few days/weeks, a new version of RomanizedMM will be released. The URL to access www.romanizedmm.com will remain the same.
                </h1>
                <h1>
                    It is possible that you may not see us on search engines (Google, Bing) for weeks to months due to indexing. I will try my best to get this site visible as soon as possible.
                </h1>
                <h1>
                    <a href="https://romanizedmmnext.onrender.com/en"><u>Peek at the new version here. It may take a while to load due to inactivity. Feedback is welcomed!</u></a>.
                </h1>
            </div>
            <MusicBox song={song} />
            <Footer />
        </div>
    );
}

async function fetchSongData(songName) {
    try {
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
    } catch (e) {
        console.log(`Error while fetching song data - ${e.message}`);
    }
}



export default MusicPage;