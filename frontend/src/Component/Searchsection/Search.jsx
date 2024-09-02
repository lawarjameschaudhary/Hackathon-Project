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
   <div>
    
   </div>
  );
};

export default Search;
