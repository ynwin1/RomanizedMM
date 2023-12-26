import React from "react"
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomFooter = styled(Typography) ({
    margin: '2rem 2rem',
    color: '#FFFFFF'
})

function Footer() {
    return (
        <CustomFooter>
        © 2023 MeloMyan. All Rights Reserved.
        </CustomFooter>
    )
}

export default Footer;