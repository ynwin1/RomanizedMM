import React, {useState} from "react"
import {FormControl, InputLabel, Input, FormHelperText} from "@mui/material";

function RequestForm() {
    const [formData, setFormData] = useState({
        songName: '',
        artist: '',
        youtubeLink: '',
        details: ''
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit() {

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

    return (
        <form onSubmit={handleSubmit}>
            {createFormControl("songName", "Song Name", formData.songName, true)}
            {createFormControl("artist", "Artist", formData.songName, true)}
            {createFormControl("youtubeLink", "Youtube Link", formData.songName, true)}
            {createFormControl("details", "Details/Comments", formData.songName, true)}
        </form>
    )
}

export default RequestForm;