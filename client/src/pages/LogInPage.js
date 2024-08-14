import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogInPage = () => {
    const { loginWithRedirect } = useAuth0();

    React.useEffect(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return <div>Loading...</div>;
};

export default LogInPage;
