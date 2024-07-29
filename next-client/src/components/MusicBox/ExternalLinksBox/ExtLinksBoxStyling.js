import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {selectTextColor} from "@/themes/ColorSelect";

export const ExtLinkCard = styled(Card)(({theme}) => ({
    margin: '1rem 0rem',
    borderRadius: '1rem',
    border: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: "transparent",
    justifyContent: "center",
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    flexGrow: '1',
    gap: '3rem',
    '@media (max-width: 768px)': {
        width: '80vw',
    }
}));