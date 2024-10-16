import React from 'react';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import {AboutTypography, AboutCard} from "./AboutBoxStyling";
import {Slide} from "@mui/material";

function AboutBox(props) {
    const theme = useTheme();

    return (
        <AboutCard>
            <CardContent sx={{textAlign: 'left', color: selectTextColor(theme.palette.mode)}}>
                <AboutTypography sx={{paddingBottom: '2rem'}}>{props.song.songName}</AboutTypography>
                <AboutTypography>{props.lang === "en" ? "Artist: " : "တေးဆို - "} {props.song.artistName}</AboutTypography>
                <AboutTypography>{props.lang === "en" ? "Album: " : "အယ်ဘမ် - "}  {props.song.albumName}</AboutTypography>
                <AboutTypography>{props.lang === "en" ? "Genre: " : "အမျိုးအစား - "} {props.song.genre}</AboutTypography>
                <AboutTypography>{props.lang === "en" ? "When to listen: " : "နားထောင်လို့ အကောင်းဆုံးအချိန် - "} {props.song.whenToListen}</AboutTypography>
            </CardContent>
        </AboutCard>
    )
}

export default AboutBox;