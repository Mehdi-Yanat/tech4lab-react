import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getCookie } from "react-use-cookie";
import { useCheckTokenQuery } from '../store/api';
import Loading from '../screens/loading';
import Error from '../screens/error';

const PrivateRoutes = () => {
    // Assuming you have a selector to get the authentication state from the Redux store
    const token = getCookie('auth-token')


    const { data, error, isLoading } = useCheckTokenQuery(token);


    // Handle loading state
    if (isLoading) {
        return <Loading />; // You can replace this with a loading spinner or any loading indicator
    }

    // Handle error state
    if (error) {
        console.error('Authentication error:', error);
        return <Error />; // You can customize the error message based on your needs
    }

    if (!data.success) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/login" />;
    }

    // Render the protected routes if the user is authenticated
    return <Outlet />;
};

export default PrivateRoutes;
