import React from "react"
import { Typography, Autocomplete, TextField} from '@mui/material';
import {styled} from '@mui/system';

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
    width: '20rem',
    alignSelf: 'center',
    '& .MuiInputBase-root': {
        fontSize: '1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem'
    }
})

function SearchBar() {
    return (
        <div className="searchBar">
            <SloganTypography>
                Sing Myanmar, Globally!
            </SloganTypography>
            <CustomAutocomplete
                disablePortal
                id="combo-box-demo"
                options={["A Mone Pin", "Min Shi Tae Myoh", "Myat Wun", "Hnit Paung Lay Sal", "Ta Moe Out"]}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Type a song title" />}
            />
        </div>
    )
}

export default SearchBar;