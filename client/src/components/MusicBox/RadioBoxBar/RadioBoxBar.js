import React from 'react';
import {Radio} from "@mui/material";
import {RadioBoxCard, ControlLabel} from "./RadioBoxStyling";

function RadioBoxBar(props) {
    const burmese = props.lang === 'en' ? "Burmese" : "မြန်မာ";
    const romanized = props.lang === 'en' ? "Romanized" : "ရိုမန်";
    const meaning = props.lang === 'en' ? "Meaning" : "အဓိပ္ပာယ်";

    const {showRomanized, showBurmese, showMeaning, setShowRomanized, setShowBurmese, setShowMeaning} = props;

    const handleRadio = (type) => {
        setShowBurmese(type === burmese);
        setShowRomanized(type === romanized);
        setShowMeaning(type === meaning);
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
                        checked={showMeaning}
                        onChange={() => handleRadio(meaning)}
                    />
                }
                label={meaning}
                show ={showMeaning}
            />
        </RadioBoxCard>
    )
}

export default RadioBoxBar;