import React, {useState} from "react";
import {CustomFormControl, CustomSubmitButton} from "../../SongRequestForm/RequestFormStyling";
import {Input, InputLabel} from "@mui/material";

function ReportForm({ song }) {

    const initialForm = {
        songName: song.songName,
        artist: song.artistName,
        report: ""
    };

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        console.log("Form submitted");
    }

    function createFormControl(name, label, val, req, readOnly=false) {
        return (
            <CustomFormControl required={req}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input
                    id={name}
                    name={name}
                    value={val}
                    onChange={handleChange}
                    className="form-input"
                    readOnly={readOnly}
                />
            </CustomFormControl>
        )
    }

    const [formData, setFormData] = useState(initialForm);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createFormControl("songName", "Song Name", formData.songName, true, true)}
                {createFormControl("artist", "Artist", formData.artist, true, true)}
                {createFormControl("report", "Report/Suggestions", formData.details, true)}
                <CustomSubmitButton type="submit">Submit</CustomSubmitButton>
            </form>
        </div>
    );
}

export default ReportForm;