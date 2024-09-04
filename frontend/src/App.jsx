import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Component/NavBar/Navbar';
import Home from './Component/Home/Home';
import Login from './Component/LoginPage/Login';
import Signup from './Component/LoginPage/Signup';
import AddJobs from './Component/Users/AddJobs';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Initial state based on token presence
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsAuthenticated(false); // Update the state to indicate the user is no longer authenticated
    navigate("/login"); // Redirect the user to the login page
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Home} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addjobs" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AddJobs} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
