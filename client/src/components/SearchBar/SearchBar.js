import React from "react"
import { useState, useEffect, useMemo } from "react";
import { TextField } from '@mui/material';
import { useTheme} from '@mui/system';
import { SloganTypography, CustomAutocomplete } from './SearchBarStyling';
import {useNavigate} from "react-router-dom";
import allSongs from "./SongHost";
import AutoCompleteSearchBar from "./AutoCompleteSearch";

function SearchBar() {
    const theme = useTheme();

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

    return (
        <div className="searchBar">
            <SloganTypography fontSize="2.5rem" theme={theme}> Sing Myanmar, Globally! </SloganTypography>
            <SloganTypography fontSize="1rem" sx={{fontFamily: 'Fugaz One'}}>
                {sloganText}
            </SloganTypography>
            <AutoCompleteSearchBar />
        </div>
    )
}

export default SearchBar;