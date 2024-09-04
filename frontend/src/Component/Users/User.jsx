import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

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

                const response = await axios.get("http://localhost:8000/api/users/profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    console.error("Failed to fetch user profile");
                    navigate("/login");
                    return;
                }

                const data = response.data;
                console.log(data);
                setImage(data.imageUrl);
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
        formData.append('image', document.querySelector('#image').files[0]); // Append the selected image file

        try {
            const response = await axios.post("http://localhost:8000/api/users/update-profile", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Ensure correct content type
                },
            });
            if (response.status === 200) {
                const updatedUser = response.data.user;
                setUser(updatedUser);
                setImage(updatedUser.imageUrl);
                toast.success("Profile updated successfully");
            } else {
                console.error("Failed to upload image");
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error updating profile");
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    const logouthandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
                {user ? (
                    <div>
                        <div className="flex justify-center mb-4">
                            <img
                                src={image}
                                alt="User profile"
                                className="w-24 h-24 rounded-full cursor-pointer"
                                onClick={() => document.querySelector('#image').click()} // Trigger file input on image click
                            />
                        </div>
                        <form onSubmit={handleUpload}>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="hidden"
                                onChange={handleUpload} // Trigger form submission when a file is selected
                                required
                            />
                            <div className="mb-4">
                                <p className="text-xl font-semibold">Username:</p>
                                <p className="text-gray-700">{user.username}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-semibold">Email:</p>
                                <p className="text-gray-700">{user.email}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-semibold">Phone Number:</p>
                                <p className="text-gray-700">{user.phoneNo || 'Not provided'}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-semibold">Location:</p>
                                <p className="text-gray-700">
                                    {user.location.city || 'Not provided'}, {user.location.state || 'Not provided'}
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No user data available</p>
                )}
            </div>
        </div>
    );
}

export default User;
