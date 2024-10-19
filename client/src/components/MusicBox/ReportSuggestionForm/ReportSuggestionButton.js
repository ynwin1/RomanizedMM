import React, {useContext} from "react";
import {ReportButton} from "./ReportButtonStyling";
import LanguageContext from "../../../language/LanguageContext";

function ReportSuggestionButton({ render }) {

    const {language} = useContext(LanguageContext);
    const reportLang = language === 'en' ? 'Report/Suggest' : 'ရီပို့/အကြံပြု';
    function renderReport() {
        render(prevState => !prevState);
    }

    return (
        <div className="report-suggestion-button">
            <ReportButton onClick={renderReport}>{reportLang}</ReportButton>
        </div>
    )
}

export default ReportSuggestionButton;