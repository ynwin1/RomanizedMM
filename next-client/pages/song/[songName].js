import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MusicBox from "@/components/MusicBox/MusicBox";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URI;
const API_URL = process.env.NEXT_PUBLIC_SEARCH_SONG_API;

function MusicPage({ initialSong }) {
    const router = useRouter();
    const { songName } = router.query;
    const [song, setSong] = useState(initialSong);

    useEffect(() => {
        if (!initialSong) {
            const songNameFormatted = songName.replace(/([A-Z])/g, ' $1').trim();
            fetchSongData(songNameFormatted).then(data => setSong(data));
        }
    }, [songName, initialSong]);

    if (!song) {
        return null;
    }

    const songNameSplit = song.songName.split('(')[0];
    const fullURL = `https://www.romanizedmm.com/song/${songNameSplit.split(" ").join("")}`;

    return (
        <div>
            <Head>
                <title>{song.songName} - {song.artistName}</title>
                <meta
                    name="description"
                    content={`${songNameSplit} Lyrics - ${song.artistName}, ${song.lyrics.slice(0, 250) + "..."}`}
                />
                <link rel="canonical" href={fullURL}/>
            </Head>
            <MusicBox song={song} />
            <Footer />
        </div>
    );
}

async function fetchSongData(songName) {
    try {
        const response  = await fetch(`${SERVER_URL}${API_URL}?term=${songName}`, {
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

export async function getServerSideProps(context) {
    const { songName } = context.params;
    const songNameFormatted = songName.replace(/([A-Z])/g, ' $1').trim();
    const initialSong = await fetchSongData(songNameFormatted);

    return { props: { initialSong } };
}

export default MusicPage;