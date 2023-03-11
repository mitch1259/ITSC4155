import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AccountDashboard from '../pages/AccountDashboard.js';
import Profile from '../pages/Profile.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import Allchart from '../pages/Allchart.js';
import SavingsBoard from '../pages/SavingsBoard.js';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/savings-boards" element={<Allchart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/savings-board/id" element={<SavingsBoard />} />
    </Routes>
  )
}

export default AppRoutes
