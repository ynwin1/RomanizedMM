import React from "react"
import ReactPlayer from "react-player";

function YoutubePlayer(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center'}}>
            <ReactPlayer url={props.link} style={{width: '30%', marginTop: '3rem'}} controls={true}/>
        </div>
    )
};

export default YoutubePlayer;