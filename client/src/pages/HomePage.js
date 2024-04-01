import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import {useState} from "react";

function HomePage() {
    const [lastSong, setLastSong] = useState('');

    return (
        <>
            <SearchBar
                lastSong={lastSong}
                setLastSong={setLastSong}/>
            <Footer />
        </>
    );
}

export default HomePage;