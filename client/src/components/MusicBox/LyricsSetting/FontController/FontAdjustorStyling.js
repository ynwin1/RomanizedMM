import {styled, useTheme} from "@mui/system";
import {Button} from "@mui/material";
import {selectTextColor} from "../../../../themes/ColorSelect";

export const FontAdjustButton = styled(Button)(({buttonColor}) => ({
    color: buttonColor === '#000000' ? 'white' : 'black',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: buttonColor,
    ":hover": {
        backgroundColor: 'grey'
    }
}));