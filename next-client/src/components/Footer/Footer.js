import React from "react";
import { useTheme } from '@mui/system';
import Link from 'next/link';
import {CustomFooter} from "@/components/Footer/FooterStyling";

function Footer() {
    const theme = useTheme();

    return (
        <CustomFooter theme={theme}>
            <Link href="/about" passHref>
                <a style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <p><u>About</u></p>
                </a>
            </Link>
            © 2024 RomanizedMM. All Rights Reserved.
        </CustomFooter>
    );
}

export default Footer;