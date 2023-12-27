import './App.css';
import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function App() {
    const [selectedSong, setSelectedSong] = useState({});
    if (selectedSong) {
        console.log(`Selected Song - ${selectedSong}`);
    }

    return (
        <div className="App">
            <NavBar />
            <SearchBar setSelectedSong={setSelectedSong}/>
            <Footer />
        </div>
    );
}

export default App;
