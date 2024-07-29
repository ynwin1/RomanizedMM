import React from "react";
import MusicBox from "@/components/MusicBox/MusicBox";
import Footer from "@/components/Footer/Footer";

async function fetchSongData(songName) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${process.env.NEXT_PUBLIC_SEARCH_SONG_API}?term=${songName}`, {
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

export default async function Page({ params }) {
    const songName = params.songName;
    const song = await fetchSongData(songName);

    return (
        <div>
            <MusicBox song={song} />
            <Footer />
        </div>
    );
}