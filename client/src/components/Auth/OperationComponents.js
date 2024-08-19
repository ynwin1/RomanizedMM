import {TextField} from "@mui/material";
import {CustomNavButton} from "../NavBar/NavBarStyling";
import React from "react";
import AutoCompleteSearchBar from "../SearchBar/AutoCompleteSearch";

const SERVER_URL = process.env.REACT_APP_BACKEND_URI;

export function AddOperation() {
    const song = {
        mmid: "",
        songName: "",
        artistName: "",
        albumName: "",
        genre: "",
        about: "",
        whenToListen: "",
        spotifyTrackId: "",
        spotifyLink: "",
        appleMusicLink: "",
        youtubeLink: "",
        imageLink: "",
        lyrics: "",
        romanized: "",
        burmese: "",
        meaning: ""
    };
    const [currentSong, setCurrentSong] = React.useState(song);

    function validateSongData() {
        return currentSong.mmid && currentSong.songName && currentSong.artistName && currentSong.genre && currentSong.about
            && currentSong.whenToListen && currentSong.lyrics && currentSong.romanized && currentSong.burmese && currentSong.meaning;
    }

    function handleInputChange(e, field) {
        const { value } = e.target;
        setCurrentSong({ ...currentSong, [field]: value });
    };

    async function addSong() {
        console.log(currentSong);
        if (!validateSongData(currentSong)) {
            document.getElementById("add-result").value = "Please fill all required fields";
            return;
        }
        try {
            const resp = await fetch(SERVER_URL + "/api/songs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentSong)
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            document.getElementById("add-result").value = data.message;
        } catch (e) {
            console.log(e.message);
            document.getElementById("add-result").value = "Failed to add song";
        } finally {
            setCurrentSong(song);
        }
    }

    return (
        <div>
            <div className="op-box">
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField required id="add-mmid" label="MMID" variant="outlined"
                                   value={currentSong.mmid}
                                   onChange={(e) => handleInputChange(e, "mmid")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-song-name" label="Song Name" variant="outlined"
                                   value={currentSong.songName}
                                   onChange={(e) => handleInputChange(e, "songName")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-artist-name" label="Artist Name" variant="outlined"
                                   value={currentSong.artistName}
                                   onChange={(e) => handleInputChange(e, "artistName")}
                        />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-album-name" label="Album Name" variant="outlined"
                                   value={currentSong.albumName}
                                   onChange={(e) => handleInputChange(e, "albumName")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-genre" label="Genre" variant="outlined"
                                   value={currentSong.genre}
                                   onChange={(e) => handleInputChange(e, "genre")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField required id="add-about" label="About" variant="outlined"
                                   value={currentSong.about}
                                   onChange={(e) => handleInputChange(e, "about")}
                        />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField required id="add-when-to-listen" label="When to Listen" variant="outlined"
                                   value={currentSong.whenToListen}
                                   onChange={(e) => handleInputChange(e, "whenToListen")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-track-id" label="Spotify TrackID" variant="outlined"
                                   value={currentSong.spotifyTrackId}
                                   onChange={(e) => handleInputChange(e, "spotifyTrackId")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-spotify-link" label="Spotify Link" variant="outlined"
                                   value={currentSong.spotifyLink}
                                   onChange={(e) => handleInputChange(e, "spotifyLink")}
                        />
                    </div>
                </div>
                <div className="op-section">
                    <div className="op-text-field">
                        <TextField id="add-apple-link" label="Apple Music Link" variant="outlined"
                                   value={currentSong.appleMusicLink}
                                   onChange={(e) => handleInputChange(e, "appleMusicLink")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-youtube-link" label="Youtube Link" variant="outlined"
                                   value={currentSong.youtubeLink}
                                   onChange={(e) => handleInputChange(e, "youtubeLink")}
                        />
                    </div>
                    <div className="op-text-field">
                        <TextField id="add-image-link" label="Image Link" variant="outlined"
                                   value={currentSong.imageLink}
                                   onChange={(e) => handleInputChange(e, "imageLink")}
                        />
                    </div>
                </div>
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-lyrics" label="Lyric" variant="outlined"
                           value={currentSong.lyrics}
                           onChange={(e) => handleInputChange(e, "lyrics")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-romanized-lyrics" label="Romanized Lyric" variant="outlined"
                           value={currentSong.romanized}
                           onChange={(e) => handleInputChange(e, "romanized")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-burmese-lyrics" label="Burmese Lyric" variant="outlined"
                           value={currentSong.burmese}
                           onChange={(e) => handleInputChange(e, "burmese")}
                />
            </div>
            <div className="op-text-field">
                <TextField required fullWidth multiline id="add-meaning-lyrics" label="Meaning" variant="outlined"
                           value={currentSong.meaning}
                           onChange={(e) => handleInputChange(e, "meaning")}
                />
            </div>
            <CustomNavButton onClick={addSong}>
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

    async function updateSong() {
        if (!currentSong) {
            document.getElementById("update-result").value = "Please select a song";
            return;
        }
        try {
            const mmid = currentSong.mmid;
            console.log("URI: " + SERVER_URL + "/api/songs/" + mmid);
            const resp = await fetch(SERVER_URL + "/api/songs/" + mmid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentSong)
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            console.log(data);
            document.getElementById("update-result").value = `Song updated - ${data.songName}`;
        } catch (e) {
            console.log(e.message);
            document.getElementById("update-result").value = "Failed to update song";
        }
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
            <CustomNavButton onClick={updateSong}>
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

    async function deleteSong() {
        if (!currentSong) {
            document.getElementById("delete-result").value = "Please select a song";
            return;
        }
        try {
            const mmid = currentSong.mmid;
            const resp = await fetch(SERVER_URL + "/api/songs/" + mmid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            document.getElementById("delete-result").value = data.message;
        } catch (e) {
            console.log(e.message);
            document.getElementById("delete-result").value = "Failed to delete song";
        }
    }

    return (
        <div className="op-container">
            <div className="searchbar-css">
                <AutoCompleteSearchBar setCurrentSong={setCurrentSong}/>
            </div>
            <CustomNavButton onClick={deleteSong}>
                Delete Song
            </CustomNavButton>
            <div className="op-text-field">
                <TextField disabled fullWidth multiline id="delete-result" label="Message" variant="filled" />
            </div>
        </div>
    );
}