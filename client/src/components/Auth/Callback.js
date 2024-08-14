import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Callback = () => {
    const { isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const token = await getAccessTokenSilently();
                const decodedToken = jwtDecode(token);
                const roles = decodedToken['http://localhost:3000/roles'] || [];

                // If the user is an admin, redirect to the admin page
                if (roles.includes('admin')) {
                    navigate('/admin');
                } else {
                    // Otherwise, redirect to the home page
                    navigate('/');
                }
            } catch (err) {
                console.error('Error getting the access token:', err);
                navigate('/');
            }
        };

        if (!isLoading) {
            // Check if the user is admin after authentication
            if (isAuthenticated) {
                checkAdminRole();
            } else if (error) {
                console.error('Error during authentication:', error);
                navigate('/');
            }
        }
    }, [isAuthenticated, isLoading, error, getAccessTokenSilently, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return null;
};

export default Callback;