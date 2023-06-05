import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil'
import { userAtom, isAuthenticatedAtom } from '../atoms/atoms'
import { history } from '../helpers/history'
import Cookies from 'js-cookie'
import isLogin from '../utils/isLogin'

import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import Index from '../pages/Index/Index'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Validate from '../pages/Validate/Validate'
import Error404 from '../pages/Errors/404/404.jsx'
import Dashboard from '../pages/Dashboard/Dashboard'

export default function Frontend() {
    return (
        <RecoilRoot>
            <Router history={history}>
                <Routes>
                    {/* Basic */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/validate" element={<Validate />} />
                    <Route exact path="/contact" element={<Contact />} />
                    {/* Protected */}
                    <Route exact path="/" element={<PrivateRoute />}>
                        <Route exact path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route exact path="/" element={<PrivateRoute />}>
                        <Route exact path="/:lang/dashboard" element={<Dashboard />} />
                    </Route>
                    {/* Lang */}
                    <Route path="/:lang/" element={<Index />} />
                    <Route path="/:lang/login" element={<Login />} />
                    <Route path="/:lang/register" element={<Register />} />
                    {/* 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}