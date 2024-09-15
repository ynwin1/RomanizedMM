import React from 'react';
import SettingsIcon from "@mui/icons-material/Settings";
import FontAdjustor from "./FontAdjustor";

function LyricsSetting(props) {

    return (
        <div className="lyrics-setting">
            <SettingsIcon onClick={props.toggleSettings}
                          style={{
                              cursor: 'pointer',
                              fontSize: '2rem',
                              color: props.textColor === '#000000' ? '#000000' : '#FFFFFF',
                              marginTop: '1rem'}}/>
            {props.showSettings &&
                <div className="font-adjustor">
                    <FontAdjustor setFontSize={props.setFontSize}/>
                </div>
            }
        </div>
    );
};

export default LyricsSetting;