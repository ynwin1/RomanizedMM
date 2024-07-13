import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {Typography} from "@mui/material";
import {selectTextColor} from "../../../themes/ColorSelect";

export const AboutCard = styled(Card)(({theme}) => ({
    margin: '1rem 1rem',
    borderRadius: '1.25rem',
    border: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: 'rgba(217, 217, 217, 0.00)',
    width: '45vw',
    height: 'auto',
    selfAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
        width: '85vw',
    }
}));

export const AboutTypography = styled(Typography) ({
    fontFamily: 'Lato',
    '@media (max-width: 768px)': {
        fontSize: '0.75rem',
    }
})