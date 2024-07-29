import React, { useState } from "react";
import SearchBar from "../src/components/SearchBar/SearchBar";
import Footer from "../src/components/Footer/Footer";
import Head from "next/head";

function HomePage() {
    const [lastSong, setLastSong] = useState('');

    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.romanizedmm.com/" />
            </Head>
            <SearchBar
                lastSong={lastSong}
                setLastSong={setLastSong}
            />
            <Footer />
        </>
    );
}

export default HomePage;