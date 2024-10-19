import React, {useContext, useEffect} from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {LyricsCard, LyricsContainer, LyricsTitleTypography, LyricsTypography} from "./LyricsBoxStyling";
import LyricsSetting from "../LyricsSetting/FontController/LyricsSetting";
import LanguageContext from "../../../language/LanguageContext";

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);
    const [showSettings, setShowSettings] = React.useState(true);
    const [fontSize, setFontSize] = React.useState(16);
    const {language} = useContext(LanguageContext);

    // language based texts
    const lyricsTitle = language === "en" ? "Lyrics" : "သီချင်းစာသား";
    const titleFontSize = language === "en" ? "2rem" : "1.5rem";

    useEffect(() => {
        setShowSettings(false);
    }, [props.song]);

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
            <LyricsTitleTypography textcolor={textColor} textsize={titleFontSize}>
                {lyricsTitle}
            </LyricsTitleTypography>
            <LyricsSetting
                textColor={textColor}
                showSettings={showSettings}
                fontSize={fontSize}
                setFontSize={setFontSize}
                toggleSettings={toggleSettings}/>
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