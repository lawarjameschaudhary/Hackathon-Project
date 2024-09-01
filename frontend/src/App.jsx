import React, { useState } from 'react'
import Navbar from './Component/NavBar/Navbar'
import Search from './Component/Searchsection/Search'
import Home from './Component/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'


const App = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      <Search setResults={setResults} />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App