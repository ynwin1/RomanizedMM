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
                <AboutTypography>Artist: {props.song.artistName}</AboutTypography>
                <AboutTypography>Album:  {props.song.albumName}</AboutTypography>
                <AboutTypography>Genre: {props.song.genre}</AboutTypography>
                <AboutTypography>About: {props.song.about}</AboutTypography>
            </CardContent>
        </AboutCard>
    )
}

export default AboutBox;