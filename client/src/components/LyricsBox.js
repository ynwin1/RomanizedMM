import React from 'react';
import { Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled} from "@mui/system";

const LyricsContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
})

const LyricsCard = styled(Card) ({
    margin: '1rem 1rem',
    borderRadius: '1.25rem',
    border: '2px solid #FFF',
    background: 'rgba(217, 217, 217, 0.00)',
    width: '50%',
    height: 'auto',
    alignSelf: 'center'
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