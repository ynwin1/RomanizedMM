import {styled} from "@mui/system";
import {Button, FormControl, Typography} from "@mui/material";

export const CustomSubmitButton = styled(Button)(({theme}) => ({
    width: '15rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    background: theme.palette.mode === 'light' ? "#000000" : "#FFFFFF",
    color: theme.palette.mode === 'light' ? "#FFFFFF" : "#000000",
    cursor: 'pointer',
    '&:hover': {
        background: '#CCCCCC'
    },
    alignSelf: 'center'
}));

export const TitleTypography = styled(Typography)(({textColor}) => ({
    fontFamily: 'Fugaz One',
    fontSize: '3rem',
    color: textColor,
    marginBottom: '2rem'
}));

export const SubtitleTypography = styled(Typography)(({textColor}) => ({
    fontFamily: 'Fugaz One',
    fontSize: '1rem',
    color: textColor,
    marginBottom: '1rem'
}));

export const CustomFormControl = styled(FormControl)({
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem 1rem'
})