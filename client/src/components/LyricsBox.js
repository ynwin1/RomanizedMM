import React from 'react';
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled} from "@mui/system";

const LyricsCard = styled(Card) ({
    margin: '2rem 2rem',
    borderRadius: '1.25rem',
    border: '5px solid #FFF',
    background: 'rgba(217, 217, 217, 0.00)',
    width: '30%',
    maxWidth: '40%',
    height: 'auto',
    '@media (max-width: 600px)': {
        width: '100%'
    }
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
        <div className="lyrics-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{fontFamily:'Fugaz One', color: '#FFFFFF', fontSize: '2rem'}}>Lyrics</Typography>
            <LyricsCard>
                <CardContent>
                    <Typography sx={{color:'#FFFFFF', fontFamily: 'Lato'}}>
                        {formatLyrics(props.song.lyrics)}
                    </Typography>
                </CardContent>
            </LyricsCard>
        </div>
    )
}

export default LyricsBox;