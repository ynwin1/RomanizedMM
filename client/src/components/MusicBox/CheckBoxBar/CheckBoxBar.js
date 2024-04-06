import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {ExtLinkCard} from "../ExternalLinksBox/ExtLinksBoxStyling";
import {CheckBoxCard} from "./CheckBoxCard";

function CheckBoxBar(props) {
    return (
        <CheckBoxCard>
            <FormControlLabel
                control={<Checkbox checked={props.showRomanized} onChange={() => {
                    console.log("showRomanized: ", !props.showRomanized)
                    props.setShowRomanized(!props.showRomanized);
                }} />}
                label="Romanized"
            />
            <FormControlLabel
                control={<Checkbox checked={props.showBurmese} onChange={() => {
                    console.log("showBurmese: ", !props.showBurmese)
                    props.setShowBurmese(!props.showBurmese);
                }} />}
                label="Burmese"
            />
            <FormControlLabel
                control={<Checkbox checked={props.showTranslated} onChange={() => {
                    console.log("showTranslated: ", !props.showTranslated);
                    props.setShowTranslated(!props.showTranslated);
                }} />}
                label="Translated"
            />
        </CheckBoxCard>
    )
}

export default CheckBoxBar;