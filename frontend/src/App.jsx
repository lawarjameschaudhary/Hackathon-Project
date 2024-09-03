import React, { useState } from 'react';
import Navbar from './Component/NavBar/Navbar';
import Home from './Component/Home/Home';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './Component/LoginPage/Login';
import Signup from './Component/LoginPage/Signup';
import User from './Component/Users/User';
import AddJobs from './Component/Users/AddJobs';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'; // Import the PrivateRoute component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if the user is authenticated
  const location = useLocation();

  return (
    <div>
      <Toaster />
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup />} />
        {/* Protect these routes */}
        <Route
          path='/user'
          element={<ProtectedRoute element={User} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/addjobs'
          element={<ProtectedRoute element={AddJobs} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </div>
  );
};

export default App;
