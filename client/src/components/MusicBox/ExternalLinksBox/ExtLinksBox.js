import React from 'react';
import {Button, Slide} from '@mui/material';
import {useTheme} from "@mui/system";
import youtubeIcon from '../../../logos/youtube.png';
import spotifyIcon from '../../../logos/spotify.png';
import appleMusicIcon from '../../../logos/appleMusic.png';
import {ExtLinkCard} from "./ExtLinksBoxStyling";

function openLink(url) {
    window.open(url, '_blank');
}

function ExtLinksBox(props) {
    const youtube = props.song.youtubeLink;
    const spotify = props.song.spotifyLink;
    const apple = props.song.appleMusicLink;

    const theme = useTheme();

    return (
        <ExtLinkCard theme={theme}>
            {youtube &&
                <Button>
                    <img className="extLinkButton" src={youtubeIcon} alt="Youtube" onClick={props.enableYoutube} />
                </Button>
            }
            {spotify &&
                <Button>
                    <img className="extLinkButton" src={spotifyIcon} alt="Spotify" onClick={() => openLink(spotify)} />
                </Button>
            }
            {apple &&
                <Button>
                    <img className="extLinkButton" src={appleMusicIcon} alt="Apple Music" onClick={() => openLink(apple)} />
                </Button>
            }
        </ExtLinkCard>
    )
}

export default ExtLinksBox;