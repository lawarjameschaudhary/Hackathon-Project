import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch("http://localhost:8000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error("Failed to fetch user profile");
                    navigate("/login");
                    return;
                }
 
                const data = await response.json();
                console.log(data);
                setImage(data.imageUrl)
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [navigate]);

    const handleUpload = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        const fileInput = document.querySelector('#image');
        formData.append('image', fileInput.files[0]);

        try {
            const response = await fetch("http://localhost:8000/api/users/update-profile", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData, // Send the image as FormData
                credentials: "include",
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update the user state with the new data
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
                {user ? (
                    <div>
                        <form onSubmit={handleUpload}>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Upload Profile Image
                                </label>
                                <input type="file" name="image" id="image" className="mt-1" required />
                            </div>
                            <button
                                type="submit"
                                className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>

                        <div className="mt-4">
                            <img src={image} alt="" />
                            <p className="text-xl font-semibold">Username:</p>
                            <p className="text-gray-700">{user.username}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-xl font-semibold">Email:</p>
                            <p className="text-gray-700">{user.email}</p>
                        </div>
                        <div className="text-center mt-6">
                            <NavLink
                                to="/addjobs"
                                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                            >
                                Add Jobs
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No user data available</p>
                )}
            </div>
        </div>
    );
}

export default User;
