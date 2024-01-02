import {styled} from "@mui/system";
import {Box, Typography} from "@mui/material";
import Card from "@mui/material/Card";

export const LyricsContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
});

export const LyricsCard = styled(Card)(({textcolor}) => ({
    margin: '1rem 1rem',
    paddingTop: '1rem',
    borderRadius: '1.25rem',
    border: `2px solid ${textcolor}`,
    background: 'rgba(217, 217, 217, 0.00)',
    width: '50%',
    maxWidth: '70%',
    height: 'auto',
    alignSelf: 'center'
}));

export const LyricsTitleTypography = styled(Typography)(({textcolor}) => ({
    fontFamily:'Fugaz One', color: textcolor, fontSize: '2rem'
}))

export const LyricsTypography = styled(Typography)(({textcolor}) => ({
    color: textcolor, fontFamily: 'Lato'
}));