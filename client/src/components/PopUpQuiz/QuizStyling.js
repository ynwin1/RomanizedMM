import React from "react";
import {styled} from "@mui/system";
import Card from "@mui/material/Card";
import {Button} from "@mui/material";

export const QuizCard = styled(Card)({
    width: '40vw',
    height: 'auto',
    backgroundColor: 'rgb(0, 0, 0, 0.8)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderRadius: '5rem',
    borderColor: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    '@media (max-width: 768px)': {
        width: '70vw',
        height: 'auto',
        fontSize: '0.8rem',
        paddingBottom: '1rem'
    }

});

export const QuizButton = styled(Button)({
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid white',
    borderRadius: '10px',
    marginTop: '1rem',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    }
});