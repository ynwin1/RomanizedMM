import React, {useContext, useState, useEffect} from "react"
import {InputLabel, Input, CircularProgress} from "@mui/material";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../../themes/ColorSelect";
import {CustomFormControl, CustomSubmitButton, SubtitleTypography, TitleTypography} from "./RequestFormStyling";
import LanguageContext from "../../language/LanguageContext";
import RequestQueue from "./RequestQueue";

const initialForm = {
    songName: '',
    artist: '',
    youtubeLink: '',
    details: ''
}

function RequestForm() {
    const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
    const CREATE_FORM_URL = process.env.REACT_APP_SUBMIT_FORM_API;
    const GET_REQUESTS_URL = process.env.REACT_APP_GET_SONG_REQUESTS_API;

    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    // form data
    const [formData, setFormData] = useState(initialForm);
    const [apiResponse, setApiResponse] = useState("");
    const [renderForm, setRenderForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // song requests
    const [songRequests, setSongRequests] = useState([]);

    const {language} = useContext(LanguageContext);
    // language based texts
    const title = language === "en" ? "Request a song!" : "သီချင်းတောင်းမယ်";
    const subTitle = language === "en" ?
        "Do you have a song that you want to sing along, but can't find it on this website? Fill out the form below!" :
        "ကိုယ်ရှာနေတဲ့ သီချင်း ဒီဝက်ဘက်ဆိုဒ်မှာ မရှိဘူးလား? ဒါဆို အောက်က ဖောင်ကိုဖြည့်ပြီး သီချင်းတောင်းဆိုလိုက်ပါ!"
    const songNameLang = language === "en" ? "Song Name" : "သီချင်းအမည်";
    const artistLang = language === "en" ? "Artist" : "တေးဆို";
    const youtubeLinkLang = language === "en" ? "Youtube Link" : "Youtube လင့်";
    const detailsLang = language === "en" ? "Details/Comments" : "မှတ်ချက်";
    const submitLang = language === "en" ? "Submit" : "တင်မည်";

    useEffect(() => {
        fetchRequests();
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    
    async function fetchRequests() {
        try {
            const response = await fetch(SERVER_URL + GET_REQUESTS_URL, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`${data.message}`);
            }
            setSongRequests(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    async function submitForm() {
        try {
            setIsLoading(true);
            console.log(`Data to be sent - ${JSON.stringify({formData})}`)
            const response = await fetch(SERVER_URL + CREATE_FORM_URL, {
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
                    className="form-input"
                />
            </CustomFormControl>
        )
    }

    return (
        <div className = {theme.palette.mode === 'light' ? "request-form-light" : "request-form-dark"}>
            <TitleTypography textColor={textColor}>
                {title}
            </TitleTypography>
            <SubtitleTypography textColor={textColor}>
                {subTitle}
            </SubtitleTypography>
            { renderForm &&
                <>
                    <form onSubmit={handleSubmit}>
                        {createFormControl("songName", songNameLang, formData.songName, true)}
                        {createFormControl("artist", artistLang, formData.artist, true)}
                        {createFormControl("youtubeLink", youtubeLinkLang, formData.youtubeLink, false)}
                        {createFormControl("details", detailsLang, formData.details, false)}
                        <CustomSubmitButton type="submit">{submitLang}</CustomSubmitButton>
                    </form>
                    {songRequests.length > 0 && <RequestQueue songRequests={songRequests}/>}
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