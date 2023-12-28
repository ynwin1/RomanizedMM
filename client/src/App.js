import './App.css';
import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import MusicBox from "./components/MusicBox";
import Footer from "./components/Footer";


function App() {
    const [selectedSong, setSelectedSong] = useState(undefined);
    const [lastSelectedSong, setLastSelectedSong] = useState('');

    return (
        <div className="App">
            <NavBar />
            <SearchBar
                setSelectedSong={setSelectedSong}
                lastSong={lastSelectedSong}
                setLastSong={setLastSelectedSong}/>
            {selectedSong && <MusicBox song={selectedSong} />}
            <Footer />
        </div>
    );
}

export default App;
