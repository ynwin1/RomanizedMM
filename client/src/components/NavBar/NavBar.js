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
import Menu from "./Menu/Menu";

function NavBar() {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const { language, toggleLanguageMode } = useContext(LanguageContext);
    const requestLang = language === 'en' ? 'Request a song' : 'သီချင်းတောင်းမယ်';

    return (
        <div>
            <CustomNavBar position="static" theme={theme}>
                <CustomToolBar>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <NavBarTypography variant="h5" theme={theme}>
                            RomanizedMM
                        </NavBarTypography>
                    </Link>
                    <Menu/>
                </CustomToolBar>
            </CustomNavBar>
        </div>
    )
}

export default NavBar;