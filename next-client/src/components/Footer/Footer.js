'use client'; // Ensure this file is treated as a client component

import React from 'react';
import { useTheme } from '@mui/system';
import { CustomFooter } from './FooterStyling';
import Link from 'next/link';

function Footer() {
    const theme = useTheme();

    return (
        <CustomFooter theme={theme}>
            <Link href="/about" passHref>
                <p style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <u>About</u>
                </p>
            </Link>
            © 2024 RomanizedMM. All Rights Reserved.
        </CustomFooter>
    );
}

export default Footer;