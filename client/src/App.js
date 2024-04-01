import './App.css';
import {useEffect, useMemo, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import SongRequest from "./pages/SongRequest";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ColorModeContext from "./themes/ThemeContext";
import HomePage from "./pages/HomePage";

// Importing music pages
import AMonePin from "./pages/music/AMonePin";
import ASinPyayParTal from "./pages/music/ASinPyayParTal";
import Loser from "./pages/music/Loser";
import MinAtwatNgar from "./pages/music/MinAtwatNgar";
import MinNehNiiPhuh from "./pages/music/MinNehNiiPhuh";
import MinShiTaeMyoh from "./pages/music/MinShiTaeMyoh";
import MoeMaKhaEainMatKhayanPyar from "./pages/music/MoeMaKhaEainMatKhayanPyar";
import PaingShin from "./pages/music/PaingShin";
import PyanLarChainLay from "./pages/music/PyanLarChainLay";
import PyanTwayKyi from "./pages/music/PyanTwayKyi";
import SaungTwinNway from "./pages/music/SaungTwinNway";
import ShaeSatYanMaShi from "./pages/music/ShaeSatYanMaShi";
import ThanYawZin from "./pages/music/ThanYawZin";

function App() {
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
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/song-request" element={<SongRequest />} />
                            <Route path="/song/AMonePin" element={<AMonePin />} />
                            <Route path="/song/ASinPyayParTal" element={<ASinPyayParTal />} />
                            <Route path="/song/Loser" element={<Loser />} />
                            <Route path="/song/MinAtwatNgar" element={<MinAtwatNgar />} />
                            <Route path="/song/MinNehNiiPhuh" element={<MinNehNiiPhuh />} />
                            <Route path="/song/MinShiTaeMyoh" element={<MinShiTaeMyoh />} />
                            <Route path="/song/MoeMaKhaEainMatKhayanPyar" element={<MoeMaKhaEainMatKhayanPyar />} />
                            <Route path="/song/PaingShin" element={<PaingShin />} />
                            <Route path="/song/PyanLarChainLay" element={<PyanLarChainLay />} />
                            <Route path="/song/PyanTwayKyi" element={<PyanTwayKyi />} />
                            <Route path="/song/SaungTwinNway" element={<SaungTwinNway />} />
                            <Route path="/song/SSYMS" element={<ShaeSatYanMaShi />} />
                            <Route path="/song/ThanYawZin" element={<ThanYawZin />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
