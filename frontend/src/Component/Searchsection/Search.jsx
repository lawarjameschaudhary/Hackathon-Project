import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const fetchData = async (value) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
    const result = data.filter((user) => {
      return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase());
    });
    console.log(result);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    fetchData(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div className='flex justify-center mt-5 items-center'>
      <div className='flex relative'>
        <button onClick={() => fetchData(input)}>
          <img src="./src/assets/magnifier.png" alt="" className='w-7 absolute right-5 top-4' />
        </button>
        <input
          type="search"
          value={input}
          onChange={handleChange}
          name="search"
          placeholder='What service are you searching for?'
          className='outline-none w-[400px] md:w-[500px] px-7 md:px-10 py-7 rounded-full border-rato border-2 h-12 bg-slate-50'
        />
      </div>
      <div className=''>
        <button onClick={handleLogout} className="ml-5 bg-rato px-7 py-3 rounded-md text-white font-ajhai-arko">Logout</button>
      </div>
    </div>
  );
};

export default Search;
