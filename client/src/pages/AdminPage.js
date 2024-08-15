import React, {useEffect} from 'react';
import Footer from "../components/Footer/Footer";
import LogOutButton from "../components/Auth/LogOutButton";
import {CustomNavButton} from "../components/NavBar/NavBarStyling";
import {useTheme} from "@mui/system";
import {selectTextColor} from "../themes/ColorSelect";
import AddOperation from "../components/Auth/OperationComponents";

const AdminPage = () => {
    const theme = useTheme();
    const textColor = selectTextColor(theme.palette.mode);

    const [operation, setOperation] = React.useState("Add");

    useEffect(() => {
        console.log("Operation: ", operation);
    }, [operation]);

    return (
        <div className="admin-box" style={{ color: textColor }}>
            <LogOutButton/>
            <h1>Admin Page</h1>
            <div className="admin-operations">
                <CustomNavButton onClick={() => setOperation("Add")}>Add</CustomNavButton>
                <CustomNavButton onClick={() => setOperation("Update")}>Update</CustomNavButton>
                <CustomNavButton onClick={() => setOperation("Delete")}>Delete</CustomNavButton>
            </div>
            {
                operation === "Add" ?
                    <AddOperation/>
                    :
                    operation === "Update" ?
                        <h2>Update</h2>
                        :
                        <h2>Delete</h2>
            }
            <Footer/>
        </div>
    );
}

export default AdminPage;