import {styled} from "@mui/system";
import {Autocomplete, Typography} from "@mui/material";
import {selectTextColor} from "../../themes/ColorSelect";

export const SloganTypography = styled(Typography)(({ fontSize, theme }) => ({
    color: selectTextColor(theme.palette.mode),
    textAlign: 'center',
    fontFamily: 'Fira Sans',
    fontSize: fontSize,
    fontStyle: 'normal',
    lineHeight: 'normal',
    padding: '1rem',
    '@media (max-width: 768px)': {
        fontSize: `calc(${fontSize} / 1.5)`,
    }
}))

export const CustomAutocomplete = styled(Autocomplete)(({theme}) => ({
    width: '40%',
    alignSelf: 'center',
    '& .MuiInputBase-root': {
        fontSize: '1rem',
        backgroundColor: theme.palette.mode === 'light' ? "#FFFFFF" : "#000000",
        color: selectTextColor(theme.palette.mode),
        borderRadius: '0.5rem',
    },
    marginTop: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
        width: '80vw',
    }
}))