import React, {useContext} from "react";
import LanguageContext from "../../language/LanguageContext";
import {selectTextColor} from "../../themes/ColorSelect";
import {useTheme} from "@mui/system";
import {LanguageSwitch} from "./TogglerStyling";

export const LanguageToggler = () => {
    const theme = useTheme();
    const color = selectTextColor(theme.palette.mode);

    const { language, toggleLanguageMode } = useContext(LanguageContext);
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: "right", alignItems: "center"}}>
            <p style={{color: color}}>English</p>
                <LanguageSwitch
                    checked={language === 'mm'}
                    onChange={toggleLanguageMode}
                    name="languageToggle"
                    inputProps={{ 'aria-label': 'language switch' }}
                />
            <p style={{color: color}}>မြန်မာ</p>
        </div>
    )
};
