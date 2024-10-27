import React, {useContext, useEffect, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import {IconButton} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {LanguageToggler} from "../../Toggler/Toggler";
import ColorModeContext from "../../../themes/ThemeContext";
import {useTheme} from "@mui/system";
import { Link } from 'react-router-dom';
import {CustomNavButton, NavBarTypography} from "../NavBarStyling";
import LanguageContext from "../../../language/LanguageContext";
import {selectTextColor} from "../../../themes/ColorSelect";

function Menu() {
    const [open, setOpen] = useState(false);
    const noScrollClass = 'no-scroll';

    // prevent scrolling in background when menu is opened
    useEffect(() => {
        if (open) {
            document.body.classList.add(noScrollClass);
        } else {
            document.body.classList.remove(noScrollClass);
        }
    }, [open]);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon
                    sx={{ fontSize: 35 }}
                />
            </IconButton>
            {open && <MenuOverlay close={setOpen}/>}
        </div>
    )
}

function MenuOverlay(props) {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const { language } = useContext(LanguageContext);
    const requestLang = language === 'en' ? 'Request a song' : 'သီချင်းတောင်းမယ်';
    const overlayColor = theme.palette.mode === "dark" ? "black" : "white";

    const buttonSize = 30;
    const textColor = selectTextColor(theme.palette.mode);
    return (
        <div className="menu-overlay" style={{background: overlayColor}}>
            <IconButton onClick={() => props.close(false)}>
                <CloseIcon  sx={{fontSize: buttonSize}}/>
            </IconButton>
            <Link to="/">
                <IconButton onClick={() => props.close(false)}>
                    <HomeIcon sx={{fontSize: buttonSize, color: textColor}} />
                </IconButton>
            </Link>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
            <LanguageToggler />
            <Link to="/song-request" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <CustomNavButton onClick={() => props.close(false)}>
                    <NavBarTypography>
                        {requestLang}
                    </NavBarTypography>
                </CustomNavButton>
            </Link>
        </div>
    )
}

export default Menu;