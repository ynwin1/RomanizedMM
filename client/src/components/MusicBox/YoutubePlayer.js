import React, {useEffect, useRef, useState} from 'react';
import { useInView } from "react-intersection-observer";
import Draggable from "react-draggable";
import ReactPlayer from "react-player";

function YoutubePlayer(props) {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <div style={{ overflow: 'hidden' }} ref={ref}>
            {inView ?
                <div className="youtube-player">
                    <ReactPlayer
                        url={props.link}
                        width='100%'
                        height='100%'
                        style={{marginTop: '1rem'}}
                        controls={true}
                    />
                </div>
                :
                <Draggable>
                    <div className="draggable-player-container">
                        <ReactPlayer
                            url={props.link}
                            width='100%'
                            height='100%'
                            controls={true}
                        />
                    </div>
                </Draggable>
            }
        </div>
    );
}

export default YoutubePlayer;