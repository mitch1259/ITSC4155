import Header from '../src/pages/Header.js';
import Footer from '../src/pages/Footer.js';
import AppRoutes from './router/AppRoutes.js';
import AuthContext from './context/AuthProvider.js';
import { useState, useContext } from 'react';

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
        <Header />
        <AppRoutes />
        {/* If a user is authenticated, show them the footer. Else, hide it */}
        { auth ? <Footer /> : <></> }
        
    </div>
  );
}

export default App;