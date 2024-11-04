import React, {useContext} from "react";
import {RequestCard, RequestQueueContainer} from "./RequestQueueStyling";
import {selectTextColor} from "../../themes/ColorSelect";
import {useTheme} from "@mui/system";
import LanguageContext from "../../language/LanguageContext";

function RequestQueue(props) {
    const theme = useTheme();
    const {language} = useContext(LanguageContext);

    const title = language === "en" ? "Songs in Queue" : "တောင်းဆိုထားသောသီချင်းများ";

    return (
        <RequestQueueContainer theme={theme}>
            <h3>{title}</h3>
            {props.songRequests.map((request, index) => {
                const {songName, artist} = request;
                return (
                    <RequestCard key={index} theme={theme}>
                        <p>{songName} - {artist}</p>
                    </RequestCard>
                )
            })}
        </RequestQueueContainer>
    )
}

export default RequestQueue;