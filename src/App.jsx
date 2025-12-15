import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Members from './pages/Members';
import Chapters from './pages/Chapters';
import ChapterDetails from './pages/ChapterDetails';
import Business from './pages/Business';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Register from './pages/Register';
import AdminRoutes from './routes/AdminRoutes';

import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Routes>
            {/* Admin Routes - No Public Navbar/Footer */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Public Routes - With Navbar & Footer */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/chapters" element={<Chapters />} />
                    <Route path="/chapters/:city" element={<ChapterDetails />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
