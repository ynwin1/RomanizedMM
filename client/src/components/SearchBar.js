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
    marginBottom: '1rem',
})

const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
const API_URL = process.env.REACT_APP_SEARCH_SONG_API;

function SearchBar(props) {
    const [userInput, setUserInput] = useState("");
    const [matchingSongs, setMatchingSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    async function fetchSongs() {
        try {
            console.log(`Fetching songs via - ${SERVER_URL}${API_URL}`);
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
        if (!matchingSongs || matchingSongs.length === 0) {
            return [];
        }

        const groupedSongs = matchingSongs.reduce((acc, song) => {
            // use first letter as key to identify groups
            const firstLetter = song.songName[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push({
                songName: song.songName,
                firstLetter: firstLetter
            });
            return acc;
        }, {});

        // sort groups by key
        const sortedGroups = Object.keys(groupedSongs).sort();
        // sort songs in each group by title
        const sortedFinal = sortedGroups.flatMap(group => {
            return groupedSongs[group].sort((a, b) => a.songName.localeCompare(b.songName));
        });
        console.log(`Sorted songs - ${sortedFinal}`);
        return sortedFinal;
    }

    function handleUserInput(event) {
        const newUserInput = event.target.value;
        setUserInput(newUserInput);
    }

    function handleUserSelection(event, value) {
        if (value === null || value === undefined) {
            props.setSelectedSong(props.lastSong);
        } else {
            const songSearched = matchingSongs.find(song => song.songName === value.songName);
            props.setSelectedSong(songSearched);
            props.setLastSong(songSearched);
        }
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
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.songName}
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