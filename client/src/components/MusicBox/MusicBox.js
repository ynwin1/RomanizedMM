import React, {useEffect, useState} from "react";
import {Fade} from "@mui/material";
import {useTheme} from "@mui/system";
import AboutBox from "./AboutBox/AboutBox";
import ExtLinksBox from "./ExternalLinksBox/ExtLinksBox";
import LyricsBox from "./LyricsBox/LyricsBox";
import {OverallContainer, AboutContainer, AboutTypography} from "./MusicBoxStyling";
import YoutubePlayer from "./YoutubePlayer";

function MusicBox(props) {
    const imageLink = props.song.imageLink;

    const theme = useTheme();

    const about = props.song.about;
    const aboutDelay = 50;
    const [aboutText, setAboutText] = useState('');
    const [aboutIndex, setAboutIndex] = useState(0);

    // reset upon change in song
    useEffect(() => {
        setAboutText('');
        setAboutIndex(0);
    }, [props.song]);

    useEffect(() => {
        if (aboutIndex < about.length) {
            const timeout = setTimeout(() => {
                setAboutText(prevText => prevText + about[aboutIndex]);
                setAboutIndex(prevIndex => prevIndex + 1);
            }, aboutDelay);

            return () => clearTimeout(timeout);
        }
    }, [aboutIndex, about]);

    const [renderYoutube, setRenderYoutube] = useState(false);

    function enableYoutube() {
        if (renderYoutube) {
            console.log("Turning off Youtube");
        } else {
            console.log("Turning on Youtube");
        }
        setRenderYoutube(prevState => !prevState);
    }

    return (
        <OverallContainer>
            <Fade in={true} timeout={1000}>
                {imageLink && <img src={imageLink} alt="albumPhoto" className="album-picture"/>}
            </Fade>
            <AboutTypography theme={theme}>{aboutText}</AboutTypography>
            <AboutBox song={props.song} />
            <ExtLinksBox song={props.song} enableYoutube={enableYoutube}/>
            {props.song.youtubeLink && renderYoutube && <YoutubePlayer link={props.song.youtubeLink}/>}
            <LyricsBox song={props.song} />
        </OverallContainer>
    )
}

export default MusicBox;