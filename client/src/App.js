import './App.css';
import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import LyricsBox from "./components/LyricsBox";
import Footer from "./components/Footer";
import AboutBox from "./components/AboutBox";

function App() {
    const [selectedSong, setSelectedSong] = useState(undefined);
    if (selectedSong) {
        console.log(`Selected Song - ${selectedSong}`);
    }

    return (
        <div className="App">
            <NavBar />
            <SearchBar setSelectedSong={setSelectedSong}/>
            {selectedSong && <AboutBox song={selectedSong} />}
            {selectedSong && <LyricsBox song={selectedSong} />}
            <Footer />
        </div>
    );
}

export default App;
