import React from "react"
import { Typography } from '@mui/material';
import {styled, useTheme} from '@mui/system';
import {selectTextColor} from "../themes/ColorSelect";

const CustomFooter = styled(Typography)(({theme}) => ({
    margin: '1rem 1rem',
    color: selectTextColor(theme.palette.mode)
}));

function Footer() {
    const theme = useTheme();

    return (
        <CustomFooter theme={theme}>
        © 2023 MeloMyan. All Rights Reserved.
        </CustomFooter>
    )
}

export default Footer;