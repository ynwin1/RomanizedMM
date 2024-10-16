import React, {useContext} from "react";
import {IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import {useTheme} from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ColorModeContext from "../../themes/ThemeContext";
import {CustomNavBar, CustomNavButton, CustomToolBar, NavBarTypography} from "./NavBarStyling"
import LanguageContext from "../../language/LanguageContext";
import {LanguageToggler} from "../Toggler/Toggler";

function NavBar() {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { language, toggleLanguageMode } = useContext(LanguageContext);

    return (
        <div>
            <CustomNavBar position="static" theme={theme}>
                <CustomToolBar>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <NavBarTypography variant="h5" theme={theme}>
                            RomanizedMM
                        </NavBarTypography>
                    </Link>
                    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                    <Link to="/song-request" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <CustomNavButton><NavBarTypography>Request a song</NavBarTypography></CustomNavButton>
                    </Link>
                </CustomToolBar>
            </CustomNavBar>
            <LanguageToggler/>
        </div>
    )
}

export default NavBar;