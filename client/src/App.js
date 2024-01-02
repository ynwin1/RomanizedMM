import './App.css';
import {useEffect, useMemo, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import MusicBox from "./components/MusicBox";
import Footer from "./components/Footer";
import SongRequest from "./SongRequest";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ColorModeContext from "./themes/ThemeContext";


function App() {
    const [selectedSong, setSelectedSong] = useState(undefined);
    const [lastSong, setLastSong] = useState('');
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );

    useEffect(() => {
        document.body.className = theme.palette.mode === 'light' ? 'body-light':'body-dark';
    })

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
