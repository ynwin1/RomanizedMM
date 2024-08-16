import {Button, TextField} from "@mui/material";
import {CustomNavButton} from "../NavBar/NavBarStyling";
import React, {useEffect, useMemo} from "react";
import AutoCompleteSearchBar from "../SearchBar/AutoCompleteSearch";

export function AddOperation() {
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
            <div className="op-text-field">
                <TextField disabled fullWidth multiline id="add-result" label="Message" variant="filled" />
            </div>
        </div>
    );
}

export function UpdateOperation() {
    const [currentSong, setCurrentSong] = React.useState(null);

    function handleInputChange(e, field) {
        const { value } = e.target;
        setCurrentSong({ ...currentSong, [field]: value });
    }

    return (
        <div>
            <div className="searchbar-css">
                <AutoCompleteSearchBar setCurrentSong={setCurrentSong}/>
            </div>
            <div className="op-box">
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField disabled id="add-mmid" label="MMID added by Engine" variant="filled"
                                   value={currentSong ? currentSong.mmid : ""}/>
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-song-name" label="Song Name" variant="outlined"
                                   value={currentSong ? currentSong.songName : ""}
                                   onChange={(e) => handleInputChange(e, "songName")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-artist-name" label="Artist Name" variant="outlined"
                                   value={currentSong ? currentSong.artistName : ""}
                                   onChange={(e) => handleInputChange(e, "artistName")}/>
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-album-name" label="Album Name" variant="outlined"
                                   value={currentSong && currentSong.albumName ? currentSong.albumName : ""}
                                   onChange={(e) => handleInputChange(e, "albumName")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-genre" label="Genre" variant="outlined"
                                      value={currentSong ? currentSong.genre : ""}
                                      onChange={(e) => handleInputChange(e, "genre")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-about" label="About" variant="outlined"
                                        value={currentSong ? currentSong.about : ""}
                                        onChange={(e) => handleInputChange(e, "about")}
                        />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField required id="add-when-to-listen" label="When to Listen" variant="outlined"
                                        value={currentSong && currentSong.whenToListen ? currentSong.whenToListen : ""}
                                        onChange={(e) => handleInputChange(e, "whenToListen")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-track-id" label="Spotify TrackID" variant="outlined"
                                      value={currentSong && currentSong.spotifyTrackId ? currentSong.spotifyTrackId : ""}
                                      onChange={(e) => handleInputChange(e, "spotifyTrackId")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-link" label="Spotify Link" variant="outlined"
                                        value={currentSong && currentSong.spotifyLink ? currentSong.spotifyLink : ""}
                                        onChange={(e) => handleInputChange(e, "spotifyLink")}
                        />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-apple-link" label="Apple Music Link" variant="outlined"
                                        value={currentSong && currentSong.appleMusicLink ? currentSong.appleMusicLink : ""}
                                        onChange={(e) => handleInputChange(e, "appleMusicLink")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-youtube-link" label="Youtube Link" variant="outlined"
                                        value={currentSong && currentSong.youtubeLink ? currentSong.youtubeLink : ""}
                                        onChange={(e) => handleInputChange(e, "youtubeLink")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-image-link" label="Image Link" variant="outlined"
                                        value={currentSong && currentSong.imageLink ? currentSong.imageLink : ""}
                                        onChange={(e) => handleInputChange(e, "imageLink")}
                        />
                    </div>
                </div>
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-lyrics" label="Lyric" variant="outlined"
                            value={currentSong ? currentSong.lyrics : ""}
                            onChange={(e) => handleInputChange(e, "lyrics")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-romanized-lyrics" label="Romanized Lyric" variant="outlined"
                            value={currentSong ? currentSong.romanized : ""}
                            onChange={(e) => handleInputChange(e, "romanized")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-burmese-lyrics" label="Burmese Lyric" variant="outlined"
                            value={currentSong ? currentSong.burmese : ""}
                            onChange={(e) => handleInputChange(e, "burmese")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-meaning-lyrics" label="Meaning" variant="outlined"
                            value={currentSong ? currentSong.meaning : ""}
                            onChange={(e) => handleInputChange(e, "meaning")}
                />
            </div>
            <CustomNavButton>
                Update Song
            </CustomNavButton>
            <div className="op-text-field">
                <TextField disabled fullWidth multiline id="update-result" label="Message" variant="filled" />
            </div>
        </div>
    );
}

export function DeleteOperation() {
    const [currentSong, setCurrentSong] = React.useState(null);

    return (
        <div className="op-container">
            <div className="searchbar-css">
                <AutoCompleteSearchBar setCurrentSong={setCurrentSong}/>
            </div>
            <CustomNavButton>
                Delete Song
            </CustomNavButton>
            <div className="op-text-field">
                <TextField disabled fullWidth multiline id="delete-result" label="Message" variant="filled" />
            </div>
        </div>
    );
}