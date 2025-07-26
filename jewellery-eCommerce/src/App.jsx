import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Navbar from './component/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductListing from './pages/ProductListing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Footer from './component/Footer.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    console.log('Route changed to:', pathname); // Debug log
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null;
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true
        });
        setUser(response.data.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Function to handle login response
  const handleLogin = (loginData) => {
    setUser(loginData.data);
    if (loginData.data.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="/product/:id" element={<ProductDetail user={user} />} />
        <Route path="/wishlist" element={<Wishlist user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}