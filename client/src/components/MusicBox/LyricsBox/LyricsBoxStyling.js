import {styled} from "@mui/system";
import {Box, Typography} from "@mui/material";
import Card from "@mui/material/Card";

export const LyricsContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
});

export const LyricsCard = styled(Card)(({textColor}) => ({
    margin: '1rem 1rem',
    paddingTop: '1rem',
    borderRadius: '1.25rem',
    border: `2px solid ${textColor}`,
    background: 'rgba(217, 217, 217, 0.00)',
    width: '50%',
    maxWidth: '70%',
    height: 'auto',
    alignSelf: 'center'
}));

export const LyricsTitleTypography = styled(Typography)(({textColor}) => ({
    fontFamily:'Fugaz One', color: textColor, fontSize: '2rem'
}))

export const LyricsTypography = styled(Typography)(({textColor}) => ({
    color: textColor, fontFamily: 'Lato'
}));