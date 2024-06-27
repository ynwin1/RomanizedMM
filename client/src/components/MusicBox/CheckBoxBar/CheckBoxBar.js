import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {CheckBoxCard} from "./CheckBoxCard";

function CheckBoxBar(props) {
    return (
        <CheckBoxCard>
            <FormControlLabel
                control={<Checkbox checked={props.showRomanized} onChange={() => {
                    console.log("showRomanized: ", !props.showRomanized)
                    props.setShowRomanized(!props.showRomanized)
                    props.setShowBurmese(false);
                    props.setShowTranslated(false);
                }} />}
                disabled={props.showRomanized}
                label="Romanized"
            />
            <FormControlLabel
                control={<Checkbox checked={props.showBurmese} onChange={() => {
                    console.log("showBurmese: ", !props.showBurmese)
                    props.setShowBurmese(!props.showBurmese);
                    props.setShowRomanized(false);
                    props.setShowTranslated(false);
                }} />}
                disabled={props.showBurmese}
                label="Burmese"
            />
            <FormControlLabel
                control={<Checkbox checked={props.showTranslated} onChange={() => {
                    console.log("showTranslated: ", !props.showTranslated);
                    props.setShowTranslated(!props.showTranslated);
                    props.setShowRomanized(false);
                    props.setShowBurmese(false);
                }} />}
                disabled={props.showTranslated}
                label="Translated"
            />
        </CheckBoxCard>
    )
}

export default CheckBoxBar;