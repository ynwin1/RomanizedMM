import React, {useEffect, useState} from "react";
import {Fade} from "@mui/material";
import {useTheme} from "@mui/system";
import AboutBox from "./AboutBox/AboutBox";
import ExtLinksBox from "./ExternalLinksBox/ExtLinksBox";
import LyricsBox from "./LyricsBox/LyricsBox";
import {OverallContainer, AboutContainer, AboutTypography} from "./MusicBoxStyling";
import YoutubePlayer from "./YoutubePlayer";
import SearchBar from "../SearchBar/SearchBar";
import AutoCompleteSearchBar from "../SearchBar/AutoCompleteSearch";
import RadioBoxBar from "./RadioBoxBar/RadioBoxBar";

function MusicBox(props) {
    const imageLink = props.song.imageLink;

    const theme = useTheme();

    const about = props.song.about;

    const [showRomanized, setShowRomanized] = useState(true);
    const [showBurmese, setShowBurmese] = useState(false);
    const [showMeaning, setShowMeaning] = useState(false);

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
            <div style={{marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AutoCompleteSearchBar />
            </div>
            {imageLink && <img src={imageLink} alt="albumPhoto" className="album-picture"/>}
            <AboutTypography theme={theme}>{about}</AboutTypography>
            <AboutBox song={props.song} />
            <ExtLinksBox song={props.song} enableYoutube={enableYoutube}/>
            {props.song.youtubeLink && renderYoutube && <YoutubePlayer link={props.song.youtubeLink}/>}
            <RadioBoxBar
                showRomanized={showRomanized}
                setShowRomanized={setShowRomanized}
                showBurmese={showBurmese}
                setShowBurmese={setShowBurmese}
                showMeaning={showMeaning}
                setShowMeaning={setShowMeaning}
            />
            <LyricsBox
                song={props.song}
                showRomanized={showRomanized}
                showBurmese={showBurmese}
                showMeaning={showMeaning}
            />
        </OverallContainer>
    )
}

export default MusicBox;