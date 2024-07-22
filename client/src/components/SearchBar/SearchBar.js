import React from "react"
import { useState, useEffect } from "react";
import { useTheme} from '@mui/system';
import { SloganTypography} from './SearchBarStyling';
import AutoCompleteSearchBar from "./AutoCompleteSearch";

function SearchBar() {
    const theme = useTheme();
    const slogan = "Discover romanized lyrics of your favourite Myanmar songs";

    return (
        <div className="searchBar">
            <SloganTypography fontSize="2.5rem" theme={theme}> Sing Myanmar, Globally! </SloganTypography>
            <SloganTypography fontSize="1rem" sx={{fontFamily: 'Fugaz One'}}>
                {slogan}
            </SloganTypography>
            <AutoCompleteSearchBar />
        </div>
    )
}

export default SearchBar;