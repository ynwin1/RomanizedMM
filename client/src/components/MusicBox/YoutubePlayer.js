import React from "react"
import ReactPlayer from "react-player";

function YoutubePlayer(props) {
    return (
        <div className="youtube-player">
            <ReactPlayer url={props.link}
                         width='100%'
                         height='100%'
                         style={{marginTop: '1rem'}}
                         controls={true}/>
        </div>
    )
}

export default YoutubePlayer;