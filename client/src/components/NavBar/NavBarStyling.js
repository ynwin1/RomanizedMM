import {styled} from "@mui/system";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

export const  CustomNavBar = styled(AppBar)(({theme}) => ({
    background: theme.palette.mode === 'dark' ? 'black' : 'white',
    height: '5rem',
    justifyContent: 'center',
    boxShadow: 'none',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

export const CustomNavButton = styled(Button)(({theme}) => ({
    fontSize: '16px',
    letterSpacing: '2px',
    textDecoration: 'none',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    cursor: 'pointer',
    border: '3px solid',
    padding: '0.25em 0.5em',
    boxShadow: '1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px',
    position: 'relative',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    '&:active': {
        boxShadow: '0px 0px 0px 0px',
        top: '5px',
        left: '5px',
    },
    '@media (min-width: 768px)': {
        padding: '0.25em 0.75em',

    },
}));

export const CustomToolBar = styled(Toolbar)({
    justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'row'
})

export const NavBarTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Cormorant Garamond',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));