import {styled} from "@mui/system";
import {Typography} from "@mui/material";
import {selectTextColor} from "@/themes/ColorSelect";

export const CustomFooter = styled(Typography)(({theme}) => ({
    margin: '1rem 1rem',
    color: selectTextColor(theme.palette.mode)
}));
