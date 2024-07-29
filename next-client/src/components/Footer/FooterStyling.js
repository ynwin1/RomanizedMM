'use client'; // Ensure this file is treated as a client component

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { selectTextColor } from '@/themes/ColorSelect';

export const CustomFooter = styled(Typography)(({ theme }) => ({
    margin: '1rem 1rem',
    color: selectTextColor(theme.palette.mode),
}));
