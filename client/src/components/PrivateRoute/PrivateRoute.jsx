import isLogin from '../../utils/isLogin'
import React, { useState, useEffect } from 'react'
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
export default function PrivateRoute({ element, ...rest }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            const token = Cookies.get('userToken');
            const email = Cookies.get('userEmail');
            const isAuth = await isLogin(token, email);
            setIsAuth(isAuth);
            setIsAuthCheckComplete(true);
        };
        fetchAuth();
    }, []);

    if (!isAuthCheckComplete) {
        return <div>Loading...</div>;
    }

    if (isAuth) {
        return <Outlet />;
    } else {
        return <Navigate to='/login' />;
    }
}
