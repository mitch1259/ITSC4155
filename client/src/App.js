import Header from '../src/pages/Header.js';
import Footer from '../src/pages/Footer.js';
import AppRoutes from './router/AppRoutes.js';

function App() {
  return (
    <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
    </div>
  );
}

export default App;