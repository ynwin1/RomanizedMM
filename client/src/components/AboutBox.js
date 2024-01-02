import React from 'react';
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled, useTheme} from "@mui/system";
import {selectTextColor} from "../../themes/ColorSelect";

const AboutCard = styled(Card)(({theme}) => ({
    margin: '1rem 1rem',
    borderRadius: '1.25rem',
    border: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: 'rgba(217, 217, 217, 0.00)',
    width: '40%',
    height: 'auto',
}));

const AboutTypography = styled(Typography) ({
    fontFamily: 'Lato'
})

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