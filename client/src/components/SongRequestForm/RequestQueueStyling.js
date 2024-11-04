import {styled} from "@mui/system";
import Card from "@mui/material/Card";


export const RequestQueueContainer = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80vw',
    height: 'auto',
    fontSize: '1rem',
    border: `2px solid ${theme.palette.mode === 'light' ? "#000000" : "#FFFFFF"}`,
    borderRadius: '1rem',
    backgroundColor: 'transparent',
    marginTop: '2rem',
}));
export const RequestCard = styled(Card)(({theme}) => ({
    width: '50vw',
    height: 'auto',
    borderRadius: '1rem',
    backgroundColor: theme.palette.mode === 'light' ? "#000000" : "#FFFFFF",
    color: theme.palette.mode === 'light' ? "#FFFFFF" : "#000000",
    marginBottom: '2rem',
    '&:hover': {
        backgroundColor: "lightgrey",
    },
    '@media (max-width: 600px)': {
        width: '70vw'
    }
}));