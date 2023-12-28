import React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import {styled} from "@mui/system";
import youtubeIcon from '../logos/youtube.png';
import spotifyIcon from '../logos/spotify.png';
import appleMusicIcon from '../logos/appleMusic.png';

const ExtLinkCard = styled(Card) ({
    margin: '2rem 2rem',
    borderRadius: '1rem',
    borderBottom: '2px solid #FFF',
    background: "transparent",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
});

function openLink(url) {
    window.open(url, '_blank');
}

function ExtLinksBox(props) {
    const youtube = props.song.youtubeLink;
    const spotify = props.song.spotifyLink;
    const apple = props.song.appleMusicLink;

    return (
        <ExtLinkCard>
            {youtube &&
                <Button>
                    <img className="extLinkButton" src={youtubeIcon} alt="Youtube" onClick={() => openLink(youtube)} />
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