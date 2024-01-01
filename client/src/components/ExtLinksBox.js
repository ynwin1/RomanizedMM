import React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import {styled, useTheme} from "@mui/system";
import youtubeIcon from '../logos/youtube.png';
import spotifyIcon from '../logos/spotify.png';
import appleMusicIcon from '../logos/appleMusic.png';
import {selectTextColor} from "../themes/ColorSelect";

const ExtLinkCard = styled(Card)(({theme}) => ({
    margin: '1rem 1rem',
    borderRadius: '1rem',
    borderBottom: `2px solid ${selectTextColor(theme.palette.mode)}`,
    background: "transparent",
    justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '20%'
}));

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