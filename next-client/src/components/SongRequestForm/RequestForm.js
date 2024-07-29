import React, {useState} from "react"
import {InputLabel, Input, CircularProgress} from "@mui/material";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../themes/ColorSelect";
import {CustomFormControl, CustomSubmitButton, SubtitleTypography, TitleTypography} from "./RequestFormStyling";

function RequestForm() {
    const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
    const API_URL = process.env.REACT_APP_SUBMIT_FORM_API;

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
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function submitForm() {
        try {
            setIsLoading(true);
            console.log(`Data to be sent - ${JSON.stringify({formData})}`)
            const response = await fetch(SERVER_URL + API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formData}),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`${data.message}`);
            }
            setApiResponse(data.message);
            setRenderForm(false);
        } catch (e) {
            console.error(e.message);
            setApiResponse('Oops! there was an error 😩. Please try again! 🙏🏻');
            setRenderForm(false);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setRenderForm(prevState => !prevState);
        await submitForm();
    }

    function handleResubmit() {
        setFormData(initialForm);
        setApiResponse("");
        setRenderForm(prevState => !prevState);
    }

    function createFormControl(name, label, val, req) {
        return (
            <CustomFormControl required={req}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input
                    id={name}
                    name={name}
                    value={val}
                    onChange={handleChange}
                    sx={{ width:'50vw', paddingLeft: '1rem'}}
                />
            </CustomFormControl>
        )
    }

    return (
        <div className = {theme.palette.mode === 'light' ? "request-form-light" : "request-form-dark"}>
            <TitleTypography textColor={textColor}>
                Request a song!
            </TitleTypography>
            { renderForm &&
                <>
                    <SubtitleTypography textColor={textColor}>
                        Do you have a song that you want to sing along, but can't find it on this website?
                        Fill out the form below!
                    </SubtitleTypography>
                    <form onSubmit={handleSubmit}>
                        {createFormControl("songName", "Song Name", formData.songName, true)}
                        {createFormControl("artist", "Artist", formData.artist, false)}
                        {createFormControl("youtubeLink", "Youtube Link", formData.youtubeLink, false)}
                        {createFormControl("details", "Details/Comments", formData.details, false)}
                        <CustomSubmitButton type="submit">Submit</CustomSubmitButton>
                    </form>
                </>
            }
            { !renderForm &&
                <>
                    {isLoading ? <CircularProgress /> :
                        <>
                            <SubtitleTypography textColor={textColor}>
                                {apiResponse}
                            </SubtitleTypography>
                            <CustomSubmitButton onClick={handleResubmit}>Request a new song</CustomSubmitButton>
                        </>
                    }

                </>
            }
        </div>
    )
}

export default RequestForm;