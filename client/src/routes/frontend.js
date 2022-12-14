import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "../pages/Index/Index";
import Contact from "../pages/Contact/Contact";
import Error404 from "../pages/Errors/404/404.jsx";

export default function Frontend() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:lang/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
