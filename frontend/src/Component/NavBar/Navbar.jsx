import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [navButton, setNavButton] = useState();
    
    const toggleButton = () => [
        setNavButton(!navButton)
    ]

  return (
    <div className=''>

      <div className='bg-rato'>
      <div className='flex justify-between  px-3 md:px-24 py-3 shadow-xl shadow-blue-200'>
        <div className="nav-logo text-white  text-2xl font-extrabold">
          <div>Hamro Kaam</div>
        </div>
        <div className="nav-list  gap-20 text-white hidden md:flex text-xl font-ajhai-arko">
          <NavLink to='/services' >Switch</NavLink>
          <NavLink to='/about' >About</NavLink>
          <NavLink to='/something' >Inquiry</NavLink>
        </div>
        <button onClick={toggleButton} className='text-white flex md:hidden'>
            <img src="./src/assets/main-menu.png" alt=""  className='w-9'/>
          </button>
      </div>
      </div>
    <div className='md:hidden flex flex-col relative '>
    {navButton && (
          <div className='bg-gray-200 absolute right-0 rounded-lg top-0  h-screen w-screen p-3 z-20'>
            <ul className='flex flex-col gap-5'>
              <li>Switch</li>
              <li>About</li>
              <li>Something</li>
            </ul>
          </div>
        )}
    </div>
    </div>
  )
}

export default Navbar