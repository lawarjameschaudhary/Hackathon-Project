import React, { useState } from 'react';
import Navbar from './Component/NavBar/Navbar';
import Home from './Component/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/LoginPage/Login';
import Signup from './Component/LoginPage/Signup';
import User from './Component/Users/User';
import AddJobs from './Component/Users/AddJobs';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [results, setResults] = useState([]);
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Home} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={User} />} /> */}
        <Route path='/addjobs' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AddJobs} />} />
      </Routes>
    </div>
  );
}

export default App;
