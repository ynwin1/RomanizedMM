import React, {useContext, useEffect, useState} from "react";
import {useTheme} from "@mui/system";
import AboutBox from "./AboutBox/AboutBox";
import ExtLinksBox from "./ExternalLinksBox/ExtLinksBox";
import LyricsBox from "./LyricsBox/LyricsBox";
import {OverallContainer, AboutContainer, AboutTypography} from "./MusicBoxStyling";
import YoutubePlayer from "./YoutubePlayer";
import AutoCompleteSearchBar from "../SearchBar/AutoCompleteSearch";
import RadioBoxBar from "./RadioBoxBar/RadioBoxBar";
import ReportSuggestionButton from "./ReportSuggestionForm/ReportSuggestionButton";
import ReportForm from "./ReportSuggestionForm/ReportForm";
import LanguageContext from "../../language/LanguageContext";
import Switch from "@mui/material/Switch";
import {Button} from "@mui/material";

function MusicBox(props) {
    const imageLink = props.song.imageLink;

    const theme = useTheme();

    const about = props.song.about;

    const [showRomanized, setShowRomanized] = useState(true);
    const [showBurmese, setShowBurmese] = useState(false);
    const [showMeaning, setShowMeaning] = useState(false);

    const [renderYoutube, setRenderYoutube] = useState(false);
    const [renderReport, setRenderReport] = useState(false);

    const { language, toggleLanguageMode } = useContext(LanguageContext);

    useEffect(() => {
        setRenderReport(false);
        setRenderYoutube(false);
    }, [props.song]);

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
            <div style={{marginTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <p>English</p><Switch
                    checked={language === 'mm'}
                    onChange={toggleLanguageMode}
                    name="languageToggle"
                    inputProps={{ 'aria-label': 'language switch' }}
                /><p>မြန်မာ</p>
                </div>
                <AutoCompleteSearchBar />
            </div>
            <div style={{marginTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ReportSuggestionButton render={setRenderReport} />
                {renderReport && <ReportForm song={props.song}/>}
            </div>
            {imageLink && <img src={imageLink} alt="albumPhoto" className="album-picture"/>}
            <AboutTypography theme={theme}>{about}</AboutTypography>
            <AboutBox song={props.song} lang={language}/>
            <ExtLinksBox song={props.song} enableYoutube={enableYoutube}/>
            {props.song.youtubeLink && renderYoutube && <YoutubePlayer link={props.song.youtubeLink}/>}
            <RadioBoxBar
                showRomanized={showRomanized}
                setShowRomanized={setShowRomanized}
                showBurmese={showBurmese}
                setShowBurmese={setShowBurmese}
                showMeaning={showMeaning}
                setShowMeaning={setShowMeaning}
                lang={language}
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