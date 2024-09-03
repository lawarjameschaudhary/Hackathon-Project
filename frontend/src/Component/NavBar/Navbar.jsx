import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [navButton, setNavButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const toggleButton = () => {
    setNavButton(!navButton);
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.length > 2) { // Start searching after user types 3 characters
      try {
        const response = await fetch(`https://countryapi.io/api/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const results = await response.json();
        console.log(results)
        setSearchResults(results);
      } catch (error) {
        console.error('Error during search:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className=''>
      <div className='bg-rato'>
        <div className='flex justify-between items-center px-3 md:px-24 py-3'>
          <div className="nav-logo text-2xl font-extrabold">
            <NavLink to='/' className='font-logo text-2xl'>Mero Kaam</NavLink>
          </div>
          <div className="nav-list gap-20 hidden md:flex items-center text-xl font-ajhai-arko">
            <NavLink className={({isActive}) => isActive? "active text-blue-400" : "text-xer"} to='/addjobs' >Switch to selling</NavLink>
            <NavLink className={({isActive}) => isActive? "active text-blue-400" : "text-black"} to='/about'>About</NavLink>
            <NavLink className={({isActive}) => isActive? "active text-blue-400" : "text-black"} to='/something'>Inquiry</NavLink>
            <div className='bg-black px-10 py-2 text-white rounded-md'>
              <NavLink to='/user'>user</NavLink>
      </div>
          </div>
          <button onClick={toggleButton} className='flex md:hidden'>
            <img src="./src/assets/main-menu.png" alt="" className='w-9'/>
          </button>
        </div>
        
      </div>
      
      <div className='md:hidden flex flex-col relative '>
        {navButton && (
          <div className='bg-gray-200 absolute right-0 rounded-lg top-0 h-screen w-screen p-3 z-20'>
            <ul className='flex flex-col gap-5'>
              <li>Switch</li>
              <li>About</li>
              <li>Something</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
