import {Button, TextField} from "@mui/material";
import {CustomNavButton} from "../NavBar/NavBarStyling";

function AddOperation() {
    return (
        <div>
            <div className="op-box">
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField disabled id="add-mmid" label="MMID added by Engine" variant="outlined"/>
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-song-name" label="Song Name" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-artist-name" label="Artist Name" variant="outlined" />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-album-name" label="Album Name" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-genre" label="Genre" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-about" label="About" variant="outlined" />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField required id="add-when-to-listen" label="When to Listen" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-track-id" label="Spotify TrackID" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-link" label="Spotify Link" variant="outlined" />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-apple-link" label="Apple Music Link" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-youtube-link" label="Youtube Link" variant="outlined" />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-image-link" label="Image Link" variant="outlined" />
                    </div>
                </div>

            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-lyrics" label="Lyric" variant="outlined" />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-romanized-lyrics" label="Romanized Lyric" variant="outlined" />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-burmese-lyrics" label="Burmese Lyric" variant="outlined" />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-meaning-lyrics" label="Meaning" variant="outlined" />
            </div>
            <CustomNavButton>
                Add Song
            </CustomNavButton>
        </div>
    );
}

export default AddOperation;