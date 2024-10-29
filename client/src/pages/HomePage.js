import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import React, {useState} from "react";
import {Helmet} from "react-helmet";
import PopUpQuiz from "../components/PopUpQuiz/PopUpQuiz";

function HomePage() {
    const [lastSong, setLastSong] = useState('');

    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://www.romanizedmm.com/"/>
            </Helmet>
            <PopUpQuiz/>
            <SearchBar
                lastSong={lastSong}
                setLastSong={setLastSong}/>
            <Footer />
        </>
    );
}

export default HomePage;