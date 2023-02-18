import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Index from '../pages/Index/Index'
import Contact from '../pages/Contact/Contact'
import Register from '../pages/Register/Register'
import Error404 from '../pages/Errors/404/404.jsx'

export default function Frontend() {
    return (
        <Router>
            <Routes>
                {/* Basic */}
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                {/* Lang */}
                <Route path="/:lang/" element={<Index />} />
                <Route path="/:lang/register" element={<Register />} />
            </Routes>
        </Router>
    )
}
