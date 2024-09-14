import React from 'react';
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

function YoutubePlayer(props) {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <div ref={ref} style={{ minHeight: inView ? 'auto' : '226px', transition: 'min-height 0.3s' }}>
            <div className={inView ? "youtube-player" : "draggable-player-container"}>
                <ReactPlayer
                    url={props.link}
                    width='100%'
                    height='100%'
                    style={{ marginTop: '1rem' }}
                    controls={true}
                />
            </div>
        </div>
    );
}

export default YoutubePlayer;