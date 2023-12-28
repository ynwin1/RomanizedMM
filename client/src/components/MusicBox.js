import React  from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import AboutBox from "./AboutBox";
import ExtLinksBox from "./ExtLinksBox";
import LyricsBox from "./LyricsBox";

const OverallContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
})

const AboutContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem',
    marginLeft: '12rem',
    alignItems: 'right',
    justifyContent: 'right'
})

function MusicBox(props) {
    return (
        <OverallContainer>
            <AboutContainer>
                <AboutBox song={props.song} />
                <ExtLinksBox song={props.song} />
            </AboutContainer>
            <LyricsBox song={props.song} />
        </OverallContainer>
    )
}

export default MusicBox;