'use client';

import React, { useContext } from "react";
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ColorModeContext from "../../themes/ThemeContext";
import { CustomNavBar, CustomNavButton, CustomToolBar, NavBarTypography } from "./NavBarStyling";
import Link from 'next/link'; // Use Next.js Link component

function NavBar() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <CustomNavBar position="static" theme={theme}>
            <CustomToolBar>
                <Link href="/" passHref>
                    <NavBarTypography variant="h5" theme={theme} component="a">
                        RomanizedMM
                    </NavBarTypography>
                </Link>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
                <Link href="/song-request" passHref>
                    <CustomNavButton component="a">
                        <NavBarTypography>Request a song</NavBarTypography>
                    </CustomNavButton>
                </Link>
            </CustomToolBar>
        </CustomNavBar>
    )
}

export default NavBar;