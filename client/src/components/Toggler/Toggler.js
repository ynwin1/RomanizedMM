import Switch from "@mui/material/Switch";
import React, {useContext} from "react";
import LanguageContext from "../../language/LanguageContext";
import {selectTextColor} from "../../themes/ColorSelect";
import {useTheme} from "@mui/system";

export const LanguageToggler = () => {
    const theme = useTheme();
    const color = selectTextColor(theme.palette.mode);

    const { language, toggleLanguageMode } = useContext(LanguageContext);
    return (
        <div style={{display: 'flex', flexDirection: 'row', marginTop:'1rem', marginRight: '2rem', justifyContent: "right", alignItems: "center"}}>
            <p style={{color: color}}>English</p>
                <Switch
                    checked={language === 'mm'}
                    onChange={toggleLanguageMode}
                    name="languageToggle"
                    inputProps={{ 'aria-label': 'language switch' }}
                />
            <p style={{color: color}}>မြန်မာ</p>
        </div>
    )
};
