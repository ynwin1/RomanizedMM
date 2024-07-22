import Footer from "../components/Footer/Footer";
import {Helmet} from "react-helmet";
import {LyricsTitleTypography} from "../components/MusicBox/LyricsBox/LyricsBoxStyling";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../themes/ColorSelect";
import webLogo from "../logos/WebLogo.png";

function AboutPage() {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

return (
        <div style={{ color: textColor }}>
            <Helmet>
                <title>About</title>
                <meta
                    name="description"
                    content="RomanizedMM is a website that provides Romanized lyrics for Myanmar songs."
                />
                <link rel="canonical" href="https://www.romanizedmm.com/about"/>
            </Helmet>
            <main className="aboutBox">
                <LyricsTitleTypography>About</LyricsTitleTypography>
                <img src={webLogo} alt="RomanizedMM Logo" style={{width: "10rem", height: "auto"}}/>
                <div className="aboutText">
                    <p>Welcome to RomanizedMM 😍!</p>
                    <p>I created this website for people who love Myanmar songs. I have seen our neighboring countries having their own website to service romanized lyrics for their songs, but when I searched ours, I found none. We do seem to have some audience from around the world 🌏, and comments in Youtube MVs are the pieces of evidence. Thus, was the birth of RomanizedMM. My goal 🏁 is to provide lyrics for Myanmar music in one stop - to browse through in Burmese language or to sing along even if you do not understand Burmese.</p>
                    <p>I provide three types of lyrics:</p>
                    <p><b>Romanized</b>: For folks who want to sing along.</p>
                    <p><b>Burmese</b>: For those who want to learn Burmese or just casually browse.</p>
                    <p><b>Meaning</b>: For people who want to know the meaning behind the lyrics.</p>
                    <p>I am a firm believer that our music has the potential to be on a global stage. I really want our musicians to succeed and be heard by people around the world. My sole goal is to help our musicians reach new heights and earn some income through the YouTube player I provide here to increase viewership counts in their MVs. I do not receive any money in any way 💯. It's all for the sake of my country.</p>
                    <p>I am always trying to improve this website. If you are looking for new songs and can't find them on the site, feel free to submit a song request through the form in the navigation bar at the top. I am very active maintaining this site, and I will try my best to respond to you within 2-3 days 😇.</p>
                    <p>Thank you for visiting my site. I hope you enjoy your stay! 🥳</p>
                </div><br/>
                <div className="aboutText">
                    <p>Welcome to RomanizedMM!</p>
                    <p>I created this website for people who love Myanmar songs. My aim is to provide lyrics for Myanmar music in one stop - for Burmese to browse through in their language and for foreign folks who are interested in our music but want to sing along to our songs.</p>
                    <p>I provide three types of lyrics:</p>
                    <p><b>Romanized</b>: For folks who want to sing along.</p>
                    <p><b>Burmese</b>: For those who want to learn Burmese or just casually browse.</p>
                    <p><b>Meaning</b>: For people who want to know the meaning behind the lyrics.</p>
                    <p>I am a firm believer that our music has the potential to be on a global stage. I do not receive any money in any way from this website. My sole goal is to help our musicians reach new heights and earn some income through the YouTube players I have provided here to increase viewership counts in their YouTube MVs.</p>
                    <p>If you are looking for new songs and can't find them on the site, feel free to submit a song request through the form. I am very active and will respond within 2-3 days. I will try my best.</p>
                    <p>Thank you for visiting my site. I hope you enjoy your stay!</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AboutPage;