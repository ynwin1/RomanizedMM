import React, {useEffect} from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {LyricsCard, LyricsContainer, LyricsTitleTypography, LyricsTypography} from "./LyricsBoxStyling";

function LyricsBox(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    // a line of lyrics in 3 types: romanized, burmese, translated
    // stored as an array of objects
    const [lyricsGroups, setLyricsGroups] = React.useState([]);

    function formatLyrics(lyrics) {
        return lyrics.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br/>
            </React.Fragment>
        ))
    }

    useEffect(() => {
        const lyricsGroups = props.song.lyrics.split('\n\n');
        console.log(lyricsGroups.length);
        const groups = [];

        // n^2 complexity hmmmm....
        lyricsGroups.forEach(group => {
            const lines = group.split('\n');
            const romanized = [];
            const burmese = [];
            const translated = [];

            if (lines.length == 4) {
                lines.forEach((line, index) => {
                    if (line.startsWith('(')) {
                        romanized.push(line + '\n');
                    } else {
                        if (index % 4 === 1) romanized.push(line);
                        else if (index % 4 === 2) burmese.push(line);
                        else if (index % 4 === 3) translated.push(line);
                    }
                });
            } else {
                lines.forEach((line, index) => {
                    if (index % 3 === 0) romanized.push(line);
                    else if (index % 3 === 1) burmese.push(line);
                    else if (index % 3 === 2) translated.push(line);
                });
            }
            groups.push({romanized, burmese, translated});
        });
        setLyricsGroups(groups);
    }, [props.song.lyrics]);

    return (
        <LyricsContainer>
            <LyricsTitleTypography textcolor={textColor}>
                Lyrics
            </LyricsTitleTypography>
            <LyricsCard textcolor={textColor}>
                <CardContent>
                    <LyricsTypography textcolor={textColor}>
                        {lyricsGroups.map((group, index) => (
                            <React.Fragment key={index}>
                                {props.showRomanized && group.romanized.map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br/>
                                    </React.Fragment>
                                ))}
                                {props.showBurmese && group.burmese.join('\n')}
                                {props.showBurmese && <br/>}
                                {props.showTranslated && group.translated.join('\n')}
                                {props.showTranslated && <br/>}
                                <br/>
                            </React.Fragment>
                        ))}
                    </LyricsTypography>
                </CardContent>
            </LyricsCard>
        </LyricsContainer>
    )
}

export default LyricsBox;