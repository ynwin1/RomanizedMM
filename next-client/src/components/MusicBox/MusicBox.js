'use client'; // Ensures this file is treated as a client component

import React, { useState } from "react";
import { useTheme } from "@mui/system";
import AboutBox from "./AboutBox/AboutBox";
import ExtLinksBox from "./ExternalLinksBox/ExtLinksBox";
import LyricsBox from "./LyricsBox/LyricsBox";
import { OverallContainer, AboutTypography } from "./MusicBoxStyling";
import YoutubePlayer from "./YoutubePlayer";
import AutoCompleteSearchBar from "../SearchBar/AutoCompleteSearch";
import RadioBoxBar from "./RadioBoxBar/RadioBoxBar";
import Image from 'next/image';

function MusicBox(props) {
    const { song } = props;
    const { imageLink, about, youtubeLink } = song;

    const theme = useTheme();

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
            <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AutoCompleteSearchBar />
            </div>
            {imageLink && (
                <div style={{ position: 'relative', width: '100%', height: 'auto', maxWidth: '400px', margin: '1rem auto' }}>
                    <Image src={imageLink} alt="albumPhoto" layout="responsive" width={400} height={400} className="album-picture" />
                </div>
            )}
            <AboutTypography theme={theme}>{about}</AboutTypography>
            <AboutBox song={song} />
            <ExtLinksBox song={song} enableYoutube={enableYoutube} />
            {youtubeLink && renderYoutube && <YoutubePlayer link={youtubeLink} />}
            <RadioBoxBar
                showRomanized={showRomanized}
                setShowRomanized={setShowRomanized}
                showBurmese={showBurmese}
                setShowBurmese={setShowBurmese}
                showMeaning={showMeaning}
                setShowMeaning={setShowMeaning}
            />
            <LyricsBox
                song={song}
                showRomanized={showRomanized}
                showBurmese={showBurmese}
                showMeaning={showMeaning}
            />
        </OverallContainer>
    );
}

export default MusicBox;