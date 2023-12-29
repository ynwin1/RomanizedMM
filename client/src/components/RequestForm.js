import React, {useState} from "react"
import {FormControl, InputLabel, Input, Button, Typography} from "@mui/material";
import {styled} from "@mui/system";

function RequestForm() {
    const SERVER_URL = 'http://localhost:4321';
    const API_URL = '/api/submitForm'

    const [formData, setFormData] = useState({
        songName: '',
        artist: '',
        youtubeLink: '',
        details: ''
    });
    const [apiResponse, setApiResponse] = useState("")

    const CustomSubmitButton = styled(Button) ({
        width: '5rem',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        background: 'white',
        color: 'black',
        cursor: 'pointer',
        '&:hover': {
            background: '#CCCCCC'
        },
    })

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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApiResponse(data.message);
        } catch (e) {
            console.log(e.message);
            setApiResponse(e.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await submitForm();
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
                    sx={{background: '#FFFFFF', width:'30rem', borderRadius: '1rem', paddingLeft: '1rem'}}
                />
            </FormControl>
        )
    }

    if (apiResponse !== "") {
        // Render message
        return (
            <div>
                <Typography sx={
                    {fontFamily: 'Fugaz One', fontSize: '2rem', color: '#FFFFFF', marginTop: '2rem'}
                }>
                    {apiResponse}
                </Typography>
            </div>
        )
    }

    return (
        <div className="request-form">
            <Typography sx={
                {fontFamily: 'Fugaz One', fontSize: '3rem', color: '#FFFFFF', marginBottom: '2rem'}
            }>
                Request a song!
            </Typography>
            <Typography sx={
                {fontFamily: 'Fugaz One', fontSize: '1rem', color: '#FFFFFF', marginBottom: '1rem'}
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
            </form>
        </div>
    )
}

export default RequestForm;