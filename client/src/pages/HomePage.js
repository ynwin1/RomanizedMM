import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import React, {useState} from "react";
import {Helmet} from "react-helmet";

function HomePage() {
    const [lastSong, setLastSong] = useState('');

    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://www.romanizedmm.com/"/>
            </Helmet>
            <SearchBar
                lastSong={lastSong}
                setLastSong={setLastSong}/>
            <Footer />
        </>
    );
}

export default HomePage;