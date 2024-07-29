import React, { useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ColorModeContext from '../src/themes/ThemeContext';
import '../src/styles/App.css';
import NavBar from '../src/components/NavBar/NavBar';

function MyApp({ Component, pageProps }) {
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
        document.body.className = theme.palette.mode === 'light' ? 'body-light' : 'body-dark';
    }, [theme.palette.mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default MyApp;