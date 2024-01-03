import React from "react"
import {useTheme} from '@mui/system';
import {CustomFooter} from './FooterStyling';


function Footer() {
    const theme = useTheme();

    return (
        <CustomFooter theme={theme}>
        © 2024 RomanizedMM. All Rights Reserved.
        </CustomFooter>
    )
}

export default Footer;