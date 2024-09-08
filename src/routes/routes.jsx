import React from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import Dashboard from "../components/Dashboard/Dashboard";
import Contact from "../components/Contact/Contact";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { AnimatePresence } from "framer-motion";
import Not_Found from "../components/Not_Found/Not_Found";
import Detail from "../components/Details/Detail";

const Routing = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main Layout Routes */}
        <Route path="/" element={<FullLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="contact" element={<Contact />} />
          <Route path="property" element={<Detail />} />
        </Route>
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;