import React from 'react';
import Footer from '../src/components/Footer/Footer';
import Head from 'next/head';
import { LyricsTitleTypography } from '@/components/MusicBox/LyricsBox/LyricsBoxStyling';
import { useTheme } from '@mui/system';
import { selectTextColor } from '@/themes/ColorSelect';
import Image from 'next/image';
import webLogo from '../public/logos/WebLogo.png'; // Ensure the logo is in the public/logos directory

function AboutPage() {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    return (
        <div style={{ color: textColor }}>
            <Head>
                <title>About</title>
                <meta
                    name="description"
                    content="RomanizedMM is a website that provides Romanized lyrics for Myanmar songs."
                />
                <link rel="canonical" href="https://www.romanizedmm.com/about" />
            </Head>
            <main className="aboutBox">
                <LyricsTitleTypography>About</LyricsTitleTypography>
                <div style={{ width: '10rem', height: 'auto', position: 'relative', marginBottom: '1rem' }}>
                    <Image src={webLogo} alt="RomanizedMM Logo" layout="responsive" width={160} height={160} />
                </div>
                <div className="aboutText">
                    <p>Welcome to RomanizedMM 😍!</p>
                    <p>
                        I created this website for people who love Myanmar songs. I have seen our neighboring countries
                        having their own website to service romanized lyrics for their songs, but when I searched ours, I
                        found none. We do seem to have some audience from around the world 🌏, and comments in Youtube
                        MVs are the pieces of evidence. Thus, was the birth of RomanizedMM. My goal is to provide lyrics
                        for Myanmar music in one stop - to browse through in Burmese language or to sing along even if
                        you do not understand Burmese.
                    </p>
                    <p>I provide three types of lyrics:</p>
                    <ul>
                        <li><b>Romanized</b>: For folks who want to sing along.</li>
                        <li><b>Burmese</b>: For those who want to learn Burmese or just casually browse.</li>
                        <li><b>Meaning</b>: For people who want to know the meaning behind the lyrics.</li>
                    </ul>
                    <p>
                        I am a firm believer that our music has the potential to be on a global stage. I really want our
                        musicians to succeed and be heard by people around the world. My sole goal is to help our
                        musicians reach new heights and earn some income through the YouTube player I provide here to
                        increase viewership counts in their MVs. I do not receive any money in any way 💯. It's all for
                        the sake of my country.
                    </p>
                    <p>
                        I am always trying to improve this website. If you are looking for new songs and can't find them
                        on the site, feel free to submit a song request through the form in the navigation bar at the
                        top. I am very active maintaining this site, and I will try my best to respond to you within 2-3
                        days 😇.
                    </p>
                    <p>Thank you for visiting my site. I hope you enjoy your stay! 🥳</p>
                </div>
                <br />
                <div className="aboutText">
                    <p>RomanizedMM ကနေ ကြိုဆိုပါတယ်</p>
                    <p>
                        ကျွန်တော် ဒီ website လေးကို မြန်မာသီချင်း ချစ်တဲ့သူတွေအတွက် ရည်ရွယ်ပြီး စလုပ်ခဲ့ပါတယ်။{" "}
                    </p>
                    <p>
                        ကျွန်တော်က နိုင်ငံခြားသီချင်းတွေ နားထောင်တာမို့ တစ်ခါတစ်လေ လိုက်ဆိုချင်ရင် အင်တာနက်ပေါ်မှာ romanized
                        lyrics (မြန်မာလိုဆို မြန်းဂလစ်ရှ်) တွေလိုက်ရှာတတ်ပါတယ်။ ဒါပေမယ့် မြန်မာသီချင်းတွေ
                        အတွက်ရှာတဲ့အခါမှာ မတွေ့ပါဘူး။ ကျွန်တော်တို့ သီချင်းတွေရဲ့ Youtube music video တွေအောက်မှာ
                        နိုင်ငံတကာက ပရိတ်သတ်တွေက lyrics တွေရယ် အဓိပ္ပာယ်တွေကို အမြဲလိုလိုတောင်းဆိုနေကြတာ
                        အထင်းသားပါ။ ဒါနဲ့ပဲ ဒီ gap လေးကို ဖြည့်ပေးမယ် တွေးရင် ဒီဝက်ဘ်ဆိုဒ်လေး ဖြစ်လာတာပါ။
                    </p>
                    <p>အဓိကအားဖြင့် သီချင်းစာသား ၃ မျိုး ချပြပေးထားပါတယ်</p>
                    <ul>
                        <li><b>Romanized</b>: လိုက်ဆိုချင်ပေမယ့် မြန်မာစာ မဖတ်တတ်တဲ့သူတွေ အတွက်ပါ</li>
                        <li><b>Burmese</b>: ဒါကတော့ မြန်မာတွေ အတွက်ပါ</li>
                        <li>
                            <b>Meaning</b>: ဒီမှာကတော့ သီချင်စာသားတွေရဲ့ အဓိပ္ပာယ်တွေပါ။ မြန်မာစာလေ့လာသူတွေအတွက်လဲ
                            အထောက်အကူဖြစ်မယ် ထင်ပါတယ်။
                        </li>
                    </ul>
                    <p>
                        ကျွန်တော် မြန်မာသီချင်းတွေကို အဆင့်တစ်ခုမှာ ရှိနေတယ်လို့ မြင်မိတယ် အထူးသဖြင့်
                        နောက်ပိုင်းထွက်တဲ့ သီချင်းတွေပါ။ ကျွန်တော် ဖြစ်စေချင်တာက ဒီသီချင်းတွေ ထွန်းပေါက်ဖို့ရယ်၊
                        နိုင်ငံတကာမှာ ကျွန်တော်တို့ အဆိုတော်တွေ နေရာတစ်ခုရဖို့ပါ။
                    </p>
                    <p>
                        ကျွန်တော့် website မှာ Youtube player ဖွင့်လိုက်တိုင်း အဆိုတော်ရဲ့ video မှာ viewer တက်ပါတယ်။
                        ဒီ video တွေက အဆိုတော်တွေ ကိုယ်တိုင် တင်ထားတဲ့ official channel တွေကတစ်ဆင့် ပြန်တင်ပေးထားတာပါ။
                        ဒီနည်းက တစ်ဖက်တစ်လမ်းက အဆိုတော်တွေကို ထောက်ပံ့တာဆိုရင်လဲ မမှားပါဘူး။ ကျွန်တော် ဒီကနေ
                        ပိုက်ဆံ တစ်ပြားတစ်ချပ်မှ မရပါဘူး။ အဓိကက အောင်မြင်စေချင်တဲ့ ရည်ရွယ်ချက်လေး
                        ဖြစ်လာအောင် အကောင်အထည် ဖော်နေတာပါ။
                    </p>
                    <p>
                        ကျွန်တော် အမြဲ ဒီ website လေးကို ထိန်းသိမ်းနေပါတယ်။ အားတဲ့အချိန်တိုင်းလဲ သီချင်းသစ်လေးတွေ
                        ထည့်ပေးနေပါတယ်။ တစ်ကယ်လို့ ကိုယ် လိုချင်တဲ့ သီချင်းမရှိဘူးဆိုရင် အပေါ်ဆုံးက "Request a song" မှာ
                        သီချင်းတောင်းလို့ရပါတယ်။ အကောင်းဆုံး ကြိုးစားပြီး ၂-၃ ရက်အတွင်း ရအောင် တင်ပေးပါ့မယ်
                    </p>
                    <p>ဒီ website လေးကို အားပေးလို့ ကျေးဇူးတင်ပါတယ်။ မြန်မာ သီချင်းတွေကို ကမ္ဘာက သိအောင် လုပ်ကြမယ် ✌️</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AboutPage;