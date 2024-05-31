import './App.css';
import {useEffect, useMemo, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import SongRequest from "./pages/SongRequest";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ColorModeContext from "./themes/ThemeContext";
import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import { SongContext } from './SongContext';


function App() {
    const [mode, setMode] = useState('light');
    const [selectedSong, setSelectedSong] = useState(null);

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
        <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <div className="App">
                            <NavBar/>
                            <Routes>
                                <Route path="/" element={<HomePage />}/>
                                <Route path="/song-request" element={<SongRequest />} />
                                <Route path="/song/:songName" element={<MusicPage />} />
                            </Routes>
                        </div>
                    </Router>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </SongContext.Provider>
    );
}

export default App;
