import React from "react"
import { useState, useEffect, useMemo } from "react";
import { TextField } from '@mui/material';
import { useTheme} from '@mui/system';
import { SloganTypography, CustomAutocomplete } from './SearchBarStyling';

const SERVER_URL = process.env.REACT_APP_BACKEND_URI;
const API_URL = process.env.REACT_APP_SEARCH_SONG_API;

function SearchBar(props) {
    const [userInput, setUserInput] = useState("");
    const [matchingSongs, setMatchingSongs] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchSongs();
    }, []);

    // slogan animation
    const slogan = "Discover romanized lyrics of your favourite Myanmar songs";
    const sloganDelay = 50;
    const [sloganText, setSloganText] = useState('');
    const [sloganIndex, setSloganIndex] = useState(0);

    useEffect(() => {
        if (sloganIndex < slogan.length) {
            const timeout = setTimeout(() => {
                setSloganText(prevText => prevText + slogan[sloganIndex]);
                setSloganIndex(prevIndex => prevIndex + 1);
            }, sloganDelay);

            return () => clearTimeout(timeout);
        }
    }, [sloganText, sloganIndex]);

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
            // pass the whole song object so can use other attributes later
            acc[firstLetter].push({
                song: song,
                firstLetter: firstLetter,
            });
            return acc;
        }, {});

        // sort groups by key
        const sortedGroups = Object.keys(groupedSongs).sort();
        // sort songs in each group by title
        const sortedFinal = sortedGroups.flatMap(group => {
            return groupedSongs[group].sort((a, b) => a.song.songName.localeCompare(b.song.songName));
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
            console.log(`MMID of value - ${value.song.mmid}`);
            const songSearched = matchingSongs.find(song => song.mmid === value.song.mmid);
            props.setSelectedSong(songSearched);
            props.setLastSong(songSearched);
        }
    }

    return (
        <div className="searchBar">
            <SloganTypography fontSize="2.5rem" theme={theme}> Sing Myanmar, Globally! </SloganTypography>
            <SloganTypography fontSize="1rem" sx={{fontFamily: 'Fugaz One'}}>
                {sloganText}
            </SloganTypography>
            <CustomAutocomplete
                //useMemo to filter only when matchingSongs changes (sloganText can cause multiple filtering)
                options={useMemo(() => filterSongs(), [matchingSongs])}
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
        </div>
    )
}

export default SearchBar;