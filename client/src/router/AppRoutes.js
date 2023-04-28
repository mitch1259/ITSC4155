import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AccountDashboard from '../pages/AccountDashboard.js';
import Profile from '../pages/Profile.js';
import Login from '../pages/Login.js';
import Registration from '../pages/Registration.js';
import Allchart from '../pages/Allchart.js';
import EditProfile from '../pages/EditProfile.js';
import SavingsBoard from '../pages/SavingsBoard.js';
import PrivateRoutes from './PrivateRoutes.js';
import CreateGoal from '../pages/CreateSavingGoal.js';
// import AuthAPI from '../server/authentication/AuthAPI.js';

function AppRoutes() {
  
  return (
    <Routes>
      
        {/* PRIVATE ROUTES -- anything listed in the below <Route> block is unavailable to unauthenticated users */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<AccountDashboard />} />
          <Route path="/savings-boards" element={<Allchart />} />
          <Route path="/profile/editprofile" element={<EditProfile />} />
          <Route path="/savings-board/:boardId" element={<SavingsBoard />} />
          <Route path='/create-saving-goal' element={<CreateGoal/>} />
        </Route>

        {/* OPEN ROUTES -- anything listed in the below <Route> block is available to unauthenticated users */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile/editprofile" element={<EditProfile />} />
        <Route path="/savings-board/id" element={<SavingsBoard />} />
        
    </Routes>
  )
}

export default AppRoutes;