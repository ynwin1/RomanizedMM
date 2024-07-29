import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from "@mui/system";
import Image from 'next/image';
import { ExtLinkCard } from "./ExtLinksBoxStyling";

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
                <Button onClick={props.enableYoutube}>
                    <Image className="extLinkButton" src="/logos/youtube.png" alt="Youtube" width={24} height={24} />
                </Button>
            }
            {spotify &&
                <Button onClick={() => openLink(spotify)}>
                    <Image className="extLinkButton" src="/logos/spotify.png" alt="Spotify" width={24} height={24} />
                </Button>
            }
            {apple &&
                <Button onClick={() => openLink(apple)}>
                    <Image className="extLinkButton" src="/logos/appleMusic.png" alt="Apple Music" width={24} height={24} />
                </Button>
            }
        </ExtLinkCard>
    )
}

export default ExtLinksBox;
