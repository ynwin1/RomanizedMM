import React from 'react';
import { Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled, useTheme} from "@mui/system";
import {selectTextColor} from "../../themes/ColorSelect";

const LyricsContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
});

const LyricsCard = styled(Card)(({textColor}) => ({
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

function formatLyrics(lyrics) {
    return lyrics.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ))
}

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    return (
        <LyricsContainer>
            <Typography sx={{fontFamily:'Fugaz One', color: textColor, fontSize: '2rem'}}>
                Lyrics
            </Typography>
            <LyricsCard textColor={textColor}>
                <CardContent>
                    <Typography sx={{color:textColor, fontFamily: 'Lato'}}>
                        {formatLyrics(props.song.lyrics)}
                    </Typography>
                </CardContent>
            </LyricsCard>
        </LyricsContainer>
    )
}

export default LyricsBox;