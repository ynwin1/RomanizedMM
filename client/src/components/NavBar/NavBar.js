import React, {useContext} from "react";
import {AppBar, Toolbar, Typography, Button, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import {styled, useTheme} from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ColorModeContext from "../../themes/ThemeContext";


const CustomAppBar = styled(AppBar)(({ theme }) => ({
    background: "linear-gradient(91deg, #6A1B9A 0.47%, #0B3D91 33.58%, #2E1C89 52.2%, #4B0082 66.08%, #FF1493 99.51%) no-repeat", // theme.palette.mode === 'light' ? '#000000':'#FFFFFF', //`linear-gradient(90deg, #434343 0%, #202020 53.2%, #000 100%)`
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    height: '5rem',
    justifyContent: 'center'
}));

const NavBarTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "'Pacifico', cursive",
    color: '#FFFFFF'
}));

// rgba(0, 123, 255, 0.50)
const CustomButton = styled(Button)({
    borderRadius: '1rem',
    background: '#000080', //'rgba(220, 20, 60, 0.80)'
    boxShadow: '2px 4px 8px 0px rgba(51, 51, 51, 0.30)',
    padding: '10px 20px',
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        background: '#00468C' // 'rgba(255, 105, 180, 0.80)'
    },
})

function NavBar(props) {
    function cleanupHome() {
        props.resetSong(undefined);
        props.resetLastSong('');
    }

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <CustomAppBar position="static" theme={theme}>
            <Toolbar sx={{justifyContent: "space-between", display: 'flex', flexDirection: 'row'}}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} onClick={cleanupHome}>
                    <NavBarTypography variant="h5" theme={theme}>
                        MeloMyan
                    </NavBarTypography>
                </Link>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ?
                        <Brightness7Icon style={{color: "white"}}/> :
                        <Brightness4Icon style={{color: "white"}}/>}
                </IconButton>
                <Link to="/song-request" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <CustomButton><NavBarTypography theme={theme}>Request a song</NavBarTypography></CustomButton>
                </Link>
            </Toolbar>
        </CustomAppBar>
    )
}

export default NavBar;