import React, {useContext, useState} from "react";
import {CustomFormControl, CustomSubmitButton, SubtitleTypography} from "../../SongRequestForm/RequestFormStyling";
import {CircularProgress, Input, InputLabel} from "@mui/material";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../../themes/ColorSelect";
import LanguageContext from "../../../language/LanguageContext";

function ReportForm({ song }) {
    const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
    const API_URL = process.env.REACT_APP_SUBMIT_REPORT_API;

    const initialForm = {
        songName: song.songName,
        artist: song.artistName,
        report: ""
    };

    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const {language} = useContext(LanguageContext);

    // language based texts
    const songNameLang = language === "en" ? "Song Name" : "သီချင်းအမည်";
    const artistLang = language === "en" ? "Artist" : "တေးဆို";
    const reportLang = language === "en" ? "Report/Suggestions" : "အမှား/အကြံပေး";
    const submitLang = language === "en" ? "Submit" : "တင်မည်";

    const [formData, setFormData] = useState(initialForm);
    const [showForm, setShowForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");

    async function submitForm() {
        try {
            setIsLoading(true);
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
        } catch (e) {
            console.error(e.message);
            setApiResponse('Oops! there was an error 😩. Please try again! 🙏🏻');
        } finally {
            setIsLoading(false);
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setShowForm(false);
        await submitForm();
    }

    function handleResubmit() {
        setApiResponse("");
        setShowForm(true);
    }

    function createFormControl(name, label, val, req, readOnly= false) {
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

    return (
        <div>
            { showForm &&
                <>
                    <form onSubmit={handleSubmit}>
                        {createFormControl("songName", songNameLang, formData.songName, false, true)}
                        {createFormControl("artist", artistLang, formData.artist, false, true)}
                        {createFormControl("report", reportLang, formData.details, true)}
                        <CustomSubmitButton type="submit"> {submitLang} </CustomSubmitButton>
                    </form>
                </>
            }
            { !showForm &&
                <>
                    {isLoading ? <CircularProgress />
                    :
                        <>
                            <SubtitleTypography textColor={textColor} sx={{marginTop: '1rem'}}>
                                {apiResponse}
                            </SubtitleTypography>
                            <CustomSubmitButton onClick={handleResubmit}> Resubmit </CustomSubmitButton>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default ReportForm;