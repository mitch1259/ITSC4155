import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AccountDashboard from '../pages/AccountDashboard.js';
import Profile from '../pages/Profile.js';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/savings-boards" element={"placeholder"} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default AppRoutes
