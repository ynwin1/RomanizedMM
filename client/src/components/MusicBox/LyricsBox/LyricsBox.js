import React, {useEffect} from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {LyricsCard, LyricsContainer, LyricsTitleTypography, LyricsTypography} from "./LyricsBoxStyling";
import LyricsSetting from "../LyricsSetting/FontController/LyricsSetting";

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);
    const [showSettings, setShowSettings] = React.useState(true);
    const [fontSize, setFontSize] = React.useState(16);

    function formatLyrics(lyrics) {
        return lyrics.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br/>
            </React.Fragment>
        ))
    }

    function toggleSettings() {
        setShowSettings(prevState => !prevState);
    }

    return (
        <LyricsContainer component={"main"}>
            <LyricsTitleTypography textcolor={textColor}>
                Lyrics
            </LyricsTitleTypography>
            <LyricsSetting showSettings={showSettings} setFontSize={setFontSize} toggleSettings={toggleSettings}/>
            <LyricsCard textcolor={textColor}>
                <CardContent>
                    <LyricsTypography textcolor={textColor} fontSize={fontSize}>
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