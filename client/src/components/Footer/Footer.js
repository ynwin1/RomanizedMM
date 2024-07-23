import React from "react"
import {useTheme} from '@mui/system';
import {CustomFooter} from './FooterStyling';
import {Link} from "react-router-dom";


function Footer() {
    const theme = useTheme();

    return (
        <CustomFooter theme={theme}>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <p><u>About</u></p>
            </Link>
        © 2024 RomanizedMM. All Rights Reserved.
        </CustomFooter>
    )
}

export default Footer;