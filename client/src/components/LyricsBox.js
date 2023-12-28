import React from 'react';
import { Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled} from "@mui/system";

const LyricsContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
    marginRight: '12rem',
    alignSelf: 'center',
    maxWidth: '80%'
})

const LyricsCard = styled(Card) ({
    margin: '2rem 2rem',
    borderRadius: '1.25rem',
    border: '2px solid #FFF',
    background: 'rgba(217, 217, 217, 0.00)',
    width: '25rem',
    height: 'auto',
})

function formatLyrics(lyrics) {
    const formattedLyrics = lyrics.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ))
    return formattedLyrics;
}

function LyricsBox(props) {
    return (
        <LyricsContainer>
            <Typography sx={{fontFamily:'Fugaz One', color: '#FFFFFF', fontSize: '2rem'}}>Lyrics</Typography>
            <LyricsCard>
                <CardContent>
                    <Typography sx={{color:'#FFFFFF', fontFamily: 'Lato'}}>
                        {formatLyrics(props.song.lyrics)}
                    </Typography>
                </CardContent>
            </LyricsCard>
        </LyricsContainer>
    )
}

export default LyricsBox;