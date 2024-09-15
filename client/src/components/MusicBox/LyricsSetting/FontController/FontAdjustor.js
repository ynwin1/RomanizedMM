import React from 'react';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../../themes/ColorSelect";
import {FontAdjustButton} from "./FontAdjustorStyling";

function FontAdjustor(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const interval = 2;
    const minFontSize = 10;
    const maxFontSize = 30;

    // true for increase, false for decrease
    function adjustFontSize(isIncrease) {
        if (isIncrease) {
            props.setFontSize(prevState => prevState + interval);
        } else {
            props.setFontSize(prevState => prevState - interval);
        }

    }


    return (
        <div className="font-adjustor">
            <p style={{color: `${textColor}`}}>Font Size</p>
            <div className="font-adjustor-buttons">
                <FontAdjustButton
                    buttonColor={textColor}
                    disabled={props.fontSize <= minFontSize}
                    onClick={() => adjustFontSize(false)}>-</FontAdjustButton>

                <FontAdjustButton
                    buttonColor={textColor}
                    disabled={props.fontSize >= maxFontSize}
                    onClick={() => adjustFontSize(true)}>+</FontAdjustButton>
            </div>
        </div>
    );
}

export default FontAdjustor;