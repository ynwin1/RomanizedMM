import React from "react"
import { useState, useEffect } from "react";
import { Typography, Autocomplete, TextField} from '@mui/material';
import { styled } from '@mui/system';

const SloganTypography = styled(Typography)({
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Pacifico',
    fontSize: '2.5rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    padding: '1rem'
})
const CustomAutocomplete = styled(Autocomplete)({
    width: '40%',
    alignSelf: 'center',
    '& .MuiInputBase-root': {
        fontSize: '1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem'
    },
    marginTop: '1rem',
    marginBottom: '1rem'
})

const SERVER_URL = 'http://localhost:4321';
const API_URL = '/api/songs/search'

function SearchBar(props) {
    const [userInput, setUserInput] = useState("");
    const [matchingSongs, setMatchingSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    async function fetchSongs() {
        try {
            const response = await fetch(SERVER_URL + API_URL + `?term=${userInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMatchingSongs(data);
        } catch (e) {
            console.log(e.message);
        }
    }

    function filterSongs() {
        return matchingSongs.map(song => song.songName);
    }

    function handleUserInput(event) {
        const newUserInput = event.target.value;
        setUserInput(newUserInput);
    }

    function handleUserSelection(event, value) {
        props.setSelectedSong(matchingSongs.find(song => song.songName === value));
    }

    return (
        <div className="searchBar">
            <SloganTypography>
                Sing Myanmar, Globally!
            </SloganTypography>
            <CustomAutocomplete
                disablePortal
                id="combo-box-demo"
                options={filterSongs()}
                onChange={handleUserSelection}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Type a song title"
                        onChange={handleUserInput}
                    />)}
            />
        </div>
    )
}

export default SearchBar;