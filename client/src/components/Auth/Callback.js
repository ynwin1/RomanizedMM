import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const { isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                getAccessTokenSilently().then(() => {
                    navigate('/admin');
                }).catch(err => {
                    console.error('Error getting the access token:', err);
                    navigate('/');
                });
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
