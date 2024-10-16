import Switch from "@mui/material/Switch";
import React, {useContext} from "react";
import LanguageContext from "../../language/LanguageContext";

export const LanguageToggler = () => {
    const { language, toggleLanguageMode } = useContext(LanguageContext);
    return (
        <div style={{display: 'flex', flexDirection: 'row', marginTop:'1rem', marginRight: '2rem', justifyContent: "right", alignItems: "center"}}>
            <p>English</p><Switch
            checked={language === 'mm'}
            onChange={toggleLanguageMode}
            name="languageToggle"
            inputProps={{ 'aria-label': 'language switch' }}
        /><p>မြန်မာ</p>
        </div>
    )
};
