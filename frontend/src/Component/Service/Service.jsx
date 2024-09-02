import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { useServices } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const [selectedService, setSelectedService] = useState('All');
    const { services, error, loading } = useServices();
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if no token is found
            navigate('/login');
        }
    }, [navigate]);

    // Handle service selection to filter job posts.
    const handleServiceSelection = (serviceName) => {
        setSelectedService(serviceName);
    };

    // Filter services based on selectedService.
    const filteredServices = services.filter(service => {
        return selectedService === 'All' || service.serviceName === selectedService;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="bg-rato relative shadow">
                <div className="flex justify-between px-14 py-5 font-ajhai-arko font-semibold text-xl">
                    <div>
                        <button>Services</button>
                    </div>
                </div>
                <div className="services absolute top-20 h-[200vh] px-14 py-10 flex flex-col gap-10 font-ajhai-arko border-r-2 text-xl bg-rato">
                    <div
                        className={`border-b-4 hover:border-white cursor-pointer ${selectedService === 'All' ? 'border-white' : ''}`}
                        onClick={() => handleServiceSelection('All')}
                    >
                        All
                    </div>
                    <div
                        className={`border-b-4 hover:border-white cursor-pointer ${selectedService === 'Plumber' ? 'border-white' : ''}`}
                        onClick={() => handleServiceSelection('Plumber')}
                    >
                        Plumber
                    </div>
                    <div
                        className={`border-b-4 hover:border-white cursor-pointer ${selectedService === 'Electrician' ? 'border-white' : ''}`}
                        onClick={() => handleServiceSelection('Electrician')}
                    >
                        Electrician
                    </div>
                    <div
                        className={`border-b-4 hover:border-white cursor-pointer ${selectedService === 'Doctor' ? 'border-white' : ''}`}
                        onClick={() => handleServiceSelection('Doctor')}
                    >
                        Doctor
                    </div>
                    <div
                        className={`border-b-4 hover:border-white cursor-pointer ${selectedService === 'Tutor' ? 'border-white' : ''}`}
                        onClick={() => handleServiceSelection('Tutor')}
                    >
                        Tutor
                    </div>
                </div>
            </div>
            <div className="mt-6 ml-[294px]">
                <div className="grid grid-cols-3 gap-4">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((item, index) => (
                            <ServiceCard data={item} key={index} />
                        ))
                    ) : (
                        <div>No services found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service;
