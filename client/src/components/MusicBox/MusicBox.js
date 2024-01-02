import React  from "react";
import {Box, Fade} from "@mui/material";
import { styled } from "@mui/system";
import AboutBox from "./AboutBox/AboutBox";
import ExtLinksBox from "./ExternalLinksBox/ExtLinksBox";
import LyricsBox from "./LyricsBox/LyricsBox";

const OverallContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
})

const AboutContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
    justifyContent: 'space-evenly'
})

function MusicBox(props) {
    const imageLink = props.song.imageLink;
    return (
        <OverallContainer>
            <Fade in={true} timeout={1000}>
                {imageLink && <img src={imageLink} alt="albumPhoto" className="album-picture"/>}
            </Fade>
            <AboutContainer>
                <AboutBox song={props.song} />
                <ExtLinksBox song={props.song} />
            </AboutContainer>
            <LyricsBox song={props.song} />
        </OverallContainer>
    )
}

export default MusicBox;