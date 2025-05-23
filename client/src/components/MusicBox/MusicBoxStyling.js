import {styled} from "@mui/system";
import {Box, Typography} from "@mui/material";
import {selectTextColor} from "../../themes/ColorSelect";

export const OverallContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const AboutContainer = styled(Box) ({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
    justifyContent: 'space-evenly'
})

export const AboutTypography = styled(Typography)(({theme}) => ({
    color: selectTextColor(theme.palette.mode),
    padding: '1.5rem',
    fontFamily: 'Fira Sans',
    fontSize: '1.2rem',
    width: '60%',
    wordWrap: 'break-word',
    alignSelf: 'center',
    lineHeight: '2.2rem',
    '@media (max-width: 768px)': {
        width: '80vw',
        fontSize: '1rem'
    }
}));