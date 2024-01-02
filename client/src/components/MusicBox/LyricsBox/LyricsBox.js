import React from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {LyricsCard, LyricsContainer, LyricsTitleTypography, LyricsTypography} from "./LyricsBoxStyling";
import {Fade} from "@mui/material";

function formatLyrics(lyrics) {
    return lyrics.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br/>
        </React.Fragment>
    ))
}

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    return (
        <Fade in={true} timeout={2000}>
            <LyricsContainer>
                <LyricsTitleTypography textcolor={textColor}>
                    Lyrics
                </LyricsTitleTypography>
                <LyricsCard textcolor={textColor}>
                    <CardContent>
                        <LyricsTypography textcolor={textColor}>
                            {formatLyrics(props.song.lyrics)}
                        </LyricsTypography>
                    </CardContent>
                </LyricsCard>
            </LyricsContainer>
        </Fade>
    )
}

export default LyricsBox;