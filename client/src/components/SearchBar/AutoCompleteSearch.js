import React, { useState, useEffect, useMemo } from "react";
import { TextField } from '@mui/material';
import { useTheme } from '@mui/system';
import { CustomAutocomplete } from './SearchBarStyling';
import { useNavigate } from "react-router-dom";
import allSongs from "./SongHost";

function AutoCompleteSearchBar() {
    const [matchingSongs, setMatchingSongs] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        loadSongs();
    }, []);

    function loadSongs() {
        const combinedSongData = allSongs();
        setMatchingSongs(combinedSongData);
    }

    function handleUserSelection(event, value) {
        if (value !== null && value !== undefined) {
            const songSearched = matchingSongs.find(song => song.mmid === value.song.mmid);
            const englishSongName = songSearched.songName.split('(')[0].trim().replace(/\s/g, '');
            console.log(`English song name - ${englishSongName}`);
            navigate(`/song/${englishSongName}`);
        }
    }

    function filterSongs() {
        if (!matchingSongs || matchingSongs.length === 0) {
            return [];
        }

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

        const sortedGroups = Object.keys(groupedSongs).sort();
        const sortedFinal = sortedGroups.flatMap(group => {
            return groupedSongs[group].sort((a, b) => a.song.songName.localeCompare(b.song.songName));
        });
        console.log(`Sorted songs - ${sortedFinal}`);
        return sortedFinal;
    }

    return (
        <CustomAutocomplete
            options={useMemo(() => filterSongs(), [matchingSongs])}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.song.songName}
            onChange={handleUserSelection}
            theme={theme}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Type a song title"
                />
            )}
        />
    );
}

export default AutoCompleteSearchBar;