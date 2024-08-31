import React, { useState } from 'react'
import Navbar from './Component/NavBar/Navbar'
import Search from './Component/Searchsection/Search'
import Home from './Component/Home/Home'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      <Navbar />
      <Search setResults={setResults} />
      <Routes>
      <Route path='/'>Home</Route>
      </Routes>
    </div>
  )
}

export default App