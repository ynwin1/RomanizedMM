import React, {useEffect} from 'react';
import Footer from "../components/Footer/Footer";
import LogOutButton from "../components/Auth/LogOutButton";
import AutoCompleteSearchBar from "../components/SearchBar/AutoCompleteSearch";
import {CustomNavButton} from "../components/NavBar/NavBarStyling";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../themes/ColorSelect";

const AdminPage = () => {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const [operation, setOperation] = React.useState("Add");

    useEffect(() => {
        console.log("Operation: ", operation);
    }, [operation]);

    return (
        <div className="admin-box" style={{ color: textColor }}>
            <h1>Admin Page</h1>
            <div className="admin-operations">
                <CustomNavButton onClick={() => setOperation("Add")}>Add</CustomNavButton>
                <CustomNavButton onClick={() => setOperation("Update")}>Update</CustomNavButton>
                <CustomNavButton onClick={() => setOperation("Delete")}>Delete</CustomNavButton>
            </div>
            {
                operation === "Add" ? <h2>Add</h2> : operation === "Update" ? <h2>Update</h2> : <h2>Delete</h2>
            }
            <LogOutButton/>
            <Footer/>
        </div>
    );
}

export default AdminPage;