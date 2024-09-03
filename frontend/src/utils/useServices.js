import { useState, useEffect } from "react";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch("http://localhost:8000/api/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.");
          } else {
            throw new Error(`Error: ${response.statusText} (${response.status})`);
          }
        }

        const data = await response.json();
        // console.log(data)
        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return { services, error, loading };
};
