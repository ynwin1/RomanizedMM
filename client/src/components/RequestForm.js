import React, {useState} from "react"
import {FormControl, InputLabel, Input, FormHelperText} from "@mui/material";

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

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function submitForm() {
        try {
            const response = await fetch(SERVER_URL + API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formData}),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApiResponse(data);
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
            <FormControl required={req}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input
                    id={name}
                    name={name}
                    value={val}
                    onChange={handleChange}
                />
                {req && <FormHelperText>Required(*)</FormHelperText>}
            </FormControl>
        )
    }

    if (apiResponse !== "") {
        // Render message
        return (
            <div>
                <h1>{apiResponse}</h1>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            {createFormControl("songName", "Song Name", formData.songName, true)}
            {createFormControl("artist", "Artist", formData.songName, true)}
            {createFormControl("youtubeLink", "Youtube Link", formData.songName, true)}
            {createFormControl("details", "Details/Comments", formData.songName, true)}
            <button type="submit">Submit</button>
        </form>
    )
}

export default RequestForm;