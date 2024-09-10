import React from "react";
import {ReportButton} from "./ReportButtonStyling";

function ReportSuggestionButton({ render }) {
    function renderReport() {
        render(prevState => !prevState);
    }

    return (
        <div className="report-suggestion-button">
            <ReportButton onClick={renderReport}>Report/Suggest</ReportButton>
        </div>
    )
}

export default ReportSuggestionButton;