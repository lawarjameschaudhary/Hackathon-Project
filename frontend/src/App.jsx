import React, { useState } from 'react'
import Navbar from './Component/NavBar/Navbar'
import Search from './Component/Searchsection/Search'
import Home from './Component/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Component/LoginPage/Login'
import Signup from './Component/LoginPage/Signup'
import User from './Component/Users/User'
import AddJobs from './Component/Users/AddJobs'
import About from './Component/About/About'
import Contact from './Component/Contact/Contact'


const App = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <Search />}
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/user' element={<User />} />
      <Route path='/addjobs' element={<AddJobs />} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      
      </Routes>
    </div>
  )
}

export default App