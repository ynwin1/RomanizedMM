import React from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {AboutTypography, AboutCard} from "./AboutBoxStyling";

function AboutBox(props) {
    const theme = useTheme();

    return (
        <AboutCard>
            <CardContent sx={{textAlign: 'left', color: selectTextColor(theme.palette.mode)}}>
                <AboutTypography sx={{paddingBottom: '2rem'}}>{props.song.songName}</AboutTypography>
                <AboutTypography><u>{props.lang === "en" ? "Artist" : "တေးဆို"}</u>: {props.song.artistName}</AboutTypography>
                <AboutTypography><u>{props.lang === "en" ? "Album" : "အယ်ဘမ်"}</u>: {props.song.albumName}</AboutTypography>
                <AboutTypography><u>{props.lang === "en" ? "Genre" : "အမျိုးအစား"}</u>: {props.song.genre}</AboutTypography>
                <AboutTypography><u>{props.lang === "en" ? "When to listen" : "ဘယ်အချိန်နားထောင်"}</u>: {props.song.whenToListen}</AboutTypography>
            </CardContent>
        </AboutCard>
    )
}

export default AboutBox;