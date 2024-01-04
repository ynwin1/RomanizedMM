import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {selectTextColor} from "../../../themes/ColorSelect";

export const ExtLinkCard = styled(Card)(({theme}) => ({
    margin: '1rem 0rem',
    borderRadius: '1rem',
    border: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: "transparent",
    justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%'
}));