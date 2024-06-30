import React from 'react';
import {Radio} from "@mui/material";
import {RadioBoxCard, ControlLabel} from "./RadioBoxStyling";

function RadioBoxBar(props) {
    const burmese = "Burmese";
    const romanized = "Romanized";
    const translated = "Translated";

    const {showRomanized, showBurmese, showTranslated, setShowRomanized, setShowBurmese, setShowTranslated} = props;

    const handleRadio = (type) => {
        setShowBurmese(type === burmese);
        setShowRomanized(type === romanized);
        setShowTranslated(type === translated);
    }

    return (
        <RadioBoxCard>
            <ControlLabel
                control={
                    <Radio
                        checked={showRomanized}
                        onChange={() => handleRadio(romanized)}
                    />
                }
                label={romanized}
                show ={showRomanized}
            />
            <ControlLabel
                control={
                    <Radio
                        checked={showBurmese}
                        onChange={() => handleRadio(burmese)}
                    />
                }
                label={burmese}
                show ={showBurmese}
            />
            <ControlLabel
                control={
                    <Radio
                        checked={showTranslated}
                        onChange={() => handleRadio(translated)}
                    />
                }
                label={translated}
                show ={showTranslated}
            />
        </RadioBoxCard>
    )
}

export default RadioBoxBar;