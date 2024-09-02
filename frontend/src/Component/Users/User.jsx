import React, { useEffect, useState } from 'react';

function User() {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token"); 

                if (!token) {
                    console.error("No token found. Please log in.");
                    return;
                }

                const response = await fetch("http://localhost:8000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include" 
                });

                if (!response.ok) {
                    console.error("Failed to fetch user profile");
                    return;
                }

                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUser();
    }, []); 

    return (
       <div>
         <div>
            {user ? (
                <div>
                    <h1>User Profile</h1>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Render other user details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
      
       </div>
    );
}

export default User;
