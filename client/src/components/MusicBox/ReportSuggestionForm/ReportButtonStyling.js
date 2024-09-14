import {Button} from "@mui/material";
import {styled} from "@mui/system";

export const ReportButton = styled(Button)({
    fontFamily: 'Lato',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#FF0000',
    borderRadius: '1.25rem',
    padding: '0.5rem 1rem',
    margin: '1rem 1rem',
    '&:hover': {
        backgroundColor: '#FF0000',
    }
});