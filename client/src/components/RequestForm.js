import React, {useState} from "react"
import {FormControl, InputLabel, Input, Button, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/system";
import {selectTextColor} from "../themes/ColorSelect";

function RequestForm() {
    const SERVER_URL = process.env.REACT_APP_BACKEND_URI; //"http://localhost:4321"
    const API_URL = process.env.REACT_APP_SUBMIT_FORM_API; //"/api/submitForm"

    const initialForm = {
        songName: '',
        artist: '',
        youtubeLink: '',
        details: ''
    }

    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const [formData, setFormData] = useState(initialForm);
    const [apiResponse, setApiResponse] = useState("");
    const [renderForm, setRenderForm] = useState(true);

    const CustomSubmitButton = styled(Button)(({theme}) => ({
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

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function submitForm() {
        try {
            console.log(`Data to be sent - ${JSON.stringify({formData})}`)
            const response = await fetch(SERVER_URL + API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formData}),
            });
            console.log(`Status - ${response.status}`);
            console.log(`Response - ${response}`)
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`${data.message}`);
            }
            setApiResponse(data.message);
            setRenderForm(false);
        } catch (e) {
            console.log(e.message);
            setApiResponse(e.message);
            setRenderForm(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setRenderForm(prevState => !prevState);
        await submitForm();
    }

    function handleResubmit() {
        setFormData(initialForm);
        setRenderForm(prevState => !prevState);
    }

    function createFormControl(name, label, val, req) {
        return (
            <FormControl required={req} sx={
                {display: 'flex', flexDirection: 'column', margin: '1rem 1rem'}}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input
                    id={name}
                    name={name}
                    value={val}
                    onChange={handleChange}
                    sx={{ background: 'transparent', width:'30rem', paddingLeft: '1rem'}}
                />
            </FormControl>
        )
    }

    return (
        <div className = {theme.palette.mode === 'light' ? "request-form-light" : "request-form-dark"}>
            <Typography sx={
                {fontFamily: 'Fugaz One', fontSize: '3rem', color: textColor, marginBottom: '2rem'}
            }>
                Request a song!
            </Typography>
            { renderForm &&
                <>
                    <Typography sx={
                        {fontFamily: 'Fugaz One', fontSize: '1rem', color: textColor, marginBottom: '1rem'}
                    }>
                        Do you have a song that you want to sing along, but can't find it on this website?
                        Fill out the form below!
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {createFormControl("songName", "Song Name", formData.songName, true)}
                        {createFormControl("artist", "Artist", formData.artist, false)}
                        {createFormControl("youtubeLink", "Youtube Link", formData.youtubeLink, false)}
                        {createFormControl("details", "Details/Comments", formData.details, false)}
                        <CustomSubmitButton type="submit">Submit</CustomSubmitButton>
                    </form></>
            }
            { !renderForm &&
                <>
                    <Typography sx={
                        {fontFamily: 'Fugaz One', fontSize: '1rem', color: textColor, marginBottom: '1rem'}
                    }>
                        {apiResponse}
                    </Typography>
                    <CustomSubmitButton onClick={handleResubmit}>Request a new song</CustomSubmitButton>
                </>
            }
        </div>
    )
}

export default RequestForm;