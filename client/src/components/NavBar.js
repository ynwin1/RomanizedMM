import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)({
    background: `linear-gradient(90deg, #434343 0%, #202020 53.2%, #000 100%)`,
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    height: '5rem',
    justifyContent: 'center'
});

const NavBarTypography = styled(Typography)({
    fontFamily: "'Pacifico', cursive",
    color: '#FFFFFF'
});

// rgba(0, 123, 255, 0.50)
const CustomButton = styled(Button)({
    borderRadius: '1rem',
    background: 'rgba(220, 20, 60, 0.80)',
    boxShadow: '2px 4px 8px 0px rgba(51, 51, 51, 0.30)',
    padding: '10px 20px',
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        background: 'rgba(255, 105, 180, 0.80)'
    },
})

function NavBar() {

    return (
        <CustomAppBar position="static">
            <Toolbar sx={{justifyContent: "space-between", display: 'flex', flexDirection: 'row',}}>
                <Link to="/" sx={{ textDecoration: 'none' }}>
                    <NavBarTypography variant="h5">
                        MeloMyan
                    </NavBarTypography>
                </Link>
                <Link to="/song-request">
                    <CustomButton><NavBarTypography>Request a song</NavBarTypography></CustomButton>
                </Link>
            </Toolbar>
        </CustomAppBar>
    )
}

export default NavBar;