import Header from '../src/pages/Header.js';
import Footer from '../src/pages/Footer.js';
import Login from '../src/pages/Login.js';
import Registration from '../src/pages/Registration.js';
import Profile from '../src/pages/Profile.js';
import AccountDashboard from './pages/AccountDashboard.js';
import AppRoutes from './router/AppRoutes.js';

function App() {
  return (
    <div className="App">
        <Header />
        <AppRoutes />
        {/* <Login /> */}
        <Footer />
    </div>
  );
}

export default App;