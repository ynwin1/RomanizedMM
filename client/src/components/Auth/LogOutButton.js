import { useAuth0 } from '@auth0/auth0-react';
import { CustomNavButton } from "../NavBar/NavBarStyling";

const LogOutButton = () => {
    const { logout } = useAuth0();
    return <CustomNavButton
        onClick={() =>
            logout({ returnTo: window.location.origin })}>
        Log Out
    </CustomNavButton>;
}

export default LogOutButton;