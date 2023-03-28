import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AccountDashboard from '../pages/AccountDashboard.js';
import Profile from '../pages/Profile.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import Allchart from '../pages/Allchart.js';
import EditProfile from '../pages/EditProfile.js';

function AppRoutes() {
  
  console.log('hi');
  
  return (
    <Routes>
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/savings-boards" element={<Allchart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile/editprofile" element={<EditProfile />} />
    </Routes>
  )
}

export default AppRoutes
