import React from "react"
import { useState, useEffect } from "react";
import { Typography, Autocomplete, TextField} from '@mui/material';
import { styled } from '@mui/system';
import debounce from 'lodash/debounce';

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
    fullWidth: true,
    alignSelf: 'center',
    '& .MuiInputBase-root': {
        fontSize: '1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem'
    }
})

const SERVER_URL = 'http://localhost:4321';
const API_URL = '/api/songs/search'

function SearchBar() {
    const [userInput, setUserInput] = useState("");
    const [allSongs, setAllSongs] = useState([]);

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
            setAllSongs(data);
        } catch (e) {
            console.log(e.message);
        }
    }

    // const debouncedFetchSongs = debounce((input) => fetchSongs(input), 500);

    function filterSongs() {
        return allSongs.map(song => song.songName);
    }

    function handleUserInput(event) {
        const newUserInput = event.target.value;
        setUserInput(newUserInput);
        // debouncedFetchSongs(userInput);
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
                sx={{ width: 300 }}
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