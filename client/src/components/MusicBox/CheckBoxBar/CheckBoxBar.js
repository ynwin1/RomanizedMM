import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {CheckBoxCard, ControlLabel} from "./CheckBoxStyling";

function CheckBoxBar(props) {
    const burmese = "Burmese";
    const romanized = "Romanized";
    const translated = "Translated";

    const {showRomanized, showBurmese, showTranslated, setShowRomanized, setShowBurmese, setShowTranslated} = props;

    const handleCheckBox = (type) => {
        setShowBurmese(type === burmese);
        setShowRomanized(type === romanized);
        setShowTranslated(type === translated);
    }

    return (
        <CheckBoxCard>
            <ControlLabel
                control={
                    <Checkbox
                        checked={showRomanized}
                        onChange={() => handleCheckBox(romanized)}
                    />
                }
                label={romanized}
                show ={showRomanized}
            />
            <ControlLabel
                control={
                    <Checkbox
                        checked={showBurmese}
                        onChange={() => handleCheckBox(burmese)}
                    />
                }
                label={burmese}
                show ={showBurmese}
            />
            <ControlLabel
                control={
                    <Checkbox
                        checked={showTranslated}
                        onChange={() => handleCheckBox(translated)}
                    />
                }
                label={translated}
                show ={showTranslated}
            />
        </CheckBoxCard>
    )
}

export default CheckBoxBar;