import React, {useContext} from "react"
import {useTheme} from '@mui/system';
import {CustomFooter} from './FooterStyling';
import {Link} from "react-router-dom";
import LanguageContext from "../../language/LanguageContext";


function Footer() {
    const theme = useTheme();

    const {language} = useContext(LanguageContext);
    const aboutLang = language === "en" ? "About" : "အကြောင်း";

    return (
        <CustomFooter theme={theme}>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <p><u>{aboutLang}</u></p>
            </Link>
        © 2024 RomanizedMM. All Rights Reserved.
        </CustomFooter>
    )
}

export default Footer;