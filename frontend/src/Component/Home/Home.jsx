import React, { useState, useEffect } from 'react';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        // Fetch data from API with token in Authorization header
        const response = await fetch("http://localhost:8000/api/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token here
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setServices(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getServices();
  }, []);

  return (
    <div className='bg-red-300 mt-6 ml-[294px]'>
      <h1>Home</h1>
      <ul className=''>
        {services.map((service, index) => (
          <div key={index} className=''>
            <li>Job :{service.serviceName}</li>
            <li>Services : {service.description}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
