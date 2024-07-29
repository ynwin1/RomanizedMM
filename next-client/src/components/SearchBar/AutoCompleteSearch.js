import React, { useState, useEffect, useMemo } from "react";
import { TextField } from '@mui/material';
import { useTheme } from '@mui/system';
import { CustomAutocomplete } from './SearchBarStyling';
import { useNavigate } from "react-router-dom";

function AutoCompleteSearchBar() {
    const [userInput, setUserInput] = useState("");
    const [matchingSongs, setMatchingSongs] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
    const API_URL = process.env.REACT_APP_SEARCH_SONG_API;

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

    function handleUserInput(event) {
        const newUserInput = event.target.value;
        setUserInput(newUserInput);
    }

    function handleUserSelection(event, value) {
        if (value !== null && value !== undefined) {
            const songSearched = value.song;
            const englishSongName = songSearched.songName.split('(')[0].trim().replace(/\s/g, '');
            console.log(`English song name - ${englishSongName}`);
            navigate(`/song/${englishSongName}`);
        }
    }

    function groupAndSortSongs() {
        // return empty array if no songs match
        console.log(`Matching songs - ${matchingSongs.length}`);
        if (!matchingSongs || matchingSongs.length === 0) {
            return [];
        }

        // group songs by first letter. Songs in each group may not be sorted yet.
        const groupedSongs = matchingSongs.reduce((acc, song) => {
            const firstLetter = song.songName[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push({
                song: song,
                firstLetter: firstLetter,
            });
            return acc;
        }, {});

        // rearrange groups in ascending alphabetical order
        const sortedGroups = Object.keys(groupedSongs).sort();
        // sort songs in each group in ascending alphabetical order
        const sortedFinal = sortedGroups.flatMap(group => {
            return groupedSongs[group].sort((a, b) => a.song.songName.localeCompare(b.song.songName));
        });
        return sortedFinal;
    }

    return (
        <CustomAutocomplete
            options={useMemo(() => groupAndSortSongs(), [matchingSongs])}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.song.songName}
            onChange={handleUserSelection}
            theme={theme}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Type a song title"
                    onChange={handleUserInput}
                />
            )}
        />
    );
}

export default AutoCompleteSearchBar;