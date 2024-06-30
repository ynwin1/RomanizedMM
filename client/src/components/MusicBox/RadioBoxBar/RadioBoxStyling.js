import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {FormControlLabel} from "@mui/material";
import {selectTextColor} from "../../../themes/ColorSelect";

export const RadioBoxCard = styled(Card)(({theme}) => ({
    margin: '2rem 0rem',
    borderRadius: '1rem',
    paddingLeft: '1rem',
    border: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: "transparent",
    justifyContent: "center",
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    gap: '1rem',
    '@media (max-width: 768px)': {
        width: '80vw',
    }
}));

export const ControlLabel = styled(FormControlLabel)(({show}) => ({
    opacity: show ? 1 : 0.5,
    transition: 'opacity 0.5s',
}));

