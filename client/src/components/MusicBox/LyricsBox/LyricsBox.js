import React, {useEffect} from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {LyricsCard, LyricsContainer, LyricsTitleTypography, LyricsTypography} from "./LyricsBoxStyling";

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    function formatLyrics(lyrics) {
        return lyrics.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br/>
            </React.Fragment>
        ))
    }

    return (
        <LyricsContainer>
            <LyricsTitleTypography textcolor={textColor}>
                Lyrics
            </LyricsTitleTypography>
            <LyricsCard textcolor={textColor}>
                <CardContent>
                    <LyricsTypography textcolor={textColor}>
                        {props.showRomanized && formatLyrics(props.song.romanized)}
                        {props.showBurmese && formatLyrics(props.song.burmese)}
                        {props.showMeaning && formatLyrics(props.song.meaning)}
                    </LyricsTypography>
                </CardContent>
            </LyricsCard>
        </LyricsContainer>
    )
}

export default LyricsBox;