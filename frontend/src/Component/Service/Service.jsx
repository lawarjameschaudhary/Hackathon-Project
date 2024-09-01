import React, { useState, useEffect } from 'react';

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    // Fetch all services or data initially
    const fetchServices = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); // Replace with your API
        const data = await response.json();
        setServices(data); // Set the fetched data
        setFilteredServices(data); // Initially display all services
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on selectedLocation
    if (selectedLocation === 'All') {
      setFilteredServices(services);
    } else {
      // Adjust filtering logic based on your data structure
      const filtered = services.filter(service => service.address.city === selectedLocation);
      setFilteredServices(filtered);
    }
  }, [selectedLocation, services]);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className='mt-6 bg-rato font-ajhai-arkoo text-white text-xl shadow-2xl shadow-blue-200'>
      <div className='flex justify-between w-[100vw] px-3 md:px-24 py-5 font-extrabold relative'>
        <div className="services">
          <button>Services</button>
        </div>
        <div className="location flex justify-center">
          <div>
            <button onClick={() => handleLocationChange('All')}>All</button>
            <button onClick={() => handleLocationChange('New York')}>New York</button>
            <button onClick={() => handleLocationChange('Los Angeles')}>Los Angeles</button>
            <button onClick={() => handleLocationChange('Chicago')}>Chicago</button>
            {/* Add more location buttons as needed */}
          </div>
        </div>
        <div className='absolute bg-rato flex flex-col gap-10 pt-10 h-screen top-[68px] left-0 px-24'>
          {filteredServices.map(service => (
            <div key={service.id}>
              <h1>{service.name}</h1>
              <p>{service.address.city}</p> {/* Adjust according to your data structure */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
