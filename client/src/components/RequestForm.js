import React, {useState} from "react"
import {FormControl, InputLabel, Input, FormHelperText} from "@mui/material";
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

    const CustomForm = styled(FormControl) ({
        display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'
    })

    function createFormControl(name, label, val, req) {
        return (
            <div className="request-form">
                <CustomForm required={req} sx={{}}>
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    <Input
                        id={name}
                        name={name}
                        value={val}
                        onChange={handleChange}
                        sx={{background: '#FFFFFF'}}
                    />
                    {/*{req && <FormHelperText>Required(*)</FormHelperText>}*/}
                </CustomForm>
            </div>
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
            {createFormControl("artist", "Artist", formData.artist, false)}
            {createFormControl("youtubeLink", "Youtube Link", formData.youtubeLink, false)}
            {createFormControl("details", "Details/Comments", formData.details, false)}
            <button type="submit">Submit</button>
        </form>
    )
}

export default RequestForm;