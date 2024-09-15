import React from 'react';
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../../themes/ColorSelect";
import {FontAdjustButton} from "./FontAdjustorStyling";

function FontAdjustor(props) {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const interval = 2;
    return (
        <div className="font-adjustor">
            <p style={{color: `${textColor}`}}>Font Size</p>
            <div className="font-adjustor-buttons">
                <FontAdjustButton buttonColor={textColor} onClick={() => props.setFontSize(prevState => prevState - interval)}>-</FontAdjustButton>
                <FontAdjustButton buttonColor={textColor} onClick={() => props.setFontSize(prevState => prevState + interval)}>+</FontAdjustButton>
            </div>
        </div>

    );
}

export default FontAdjustor;