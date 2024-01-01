import './App.css';
import { useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import MusicBox from "./components/MusicBox";
import Footer from "./components/Footer";
import SongRequest from "./SongRequest";


function App() {
    const [selectedSong, setSelectedSong] = useState(undefined);
    const [lastSong, setLastSong] = useState('');

    return (
        <Router>
            <div className="App">
                <NavBar resetSong={setSelectedSong} resetLastSong={setLastSong}/>
                <Routes>
                    <Route path="/" element={
                        <>
                            <SearchBar
                                setSelectedSong={setSelectedSong}
                                lastSong={lastSong}
                                setLastSong={setLastSong}/>
                            {selectedSong && <MusicBox song={selectedSong} />}
                            <Footer />
                        </>
                    }/>
                    <Route path="/song-request" element={<SongRequest />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
