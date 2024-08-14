import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }
    return <Outlet />;
};

export default PrivateRoutes;