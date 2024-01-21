import {styled} from "@mui/system";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

export const  CustomNavBar = styled(AppBar)({
    background: "linear-gradient(91deg, #6A1B9A 0.47%, #0B3D91 33.58%, #2E1C89 52.2%, #4B0082 66.08%, #FF1493 99.51%) no-repeat", // theme.palette.mode === 'light' ? '#000000':'#FFFFFF', //`linear-gradient(90deg, #434343 0%, #202020 53.2%, #000 100%)`
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    height: '5rem',
    justifyContent: 'center'
});

export const CustomNavButton = styled(Button)({
    borderRadius: '1rem',
    background: '#000080', //'rgba(220, 20, 60, 0.80)'
    boxShadow: '2px 4px 8px 0px rgba(51, 51, 51, 0.30)',
    padding: '10px 20px',
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        background: '#00468C' // 'rgba(255, 105, 180, 0.80)'
    },
});

export const CustomToolBar = styled(Toolbar)({
    justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'row'
})

export const NavBarTypography = styled(Typography)({
    fontFamily: "'Pacifico', cursive",
    color: '#FFFFFF'
});