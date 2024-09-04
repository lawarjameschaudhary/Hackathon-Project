import React, { useState } from 'react';
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddJobs = () => {
    const [jobs, setJobs] = useState({
        username: "",
        serviceName: "",
        description: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (jobs.serviceName === "" || jobs.description === "") {
            toast.error("Please fill all the fields");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("No token found. Please log in.");
            navigate("/login"); // Redirect with useNavigate
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/services", { 
                serviceName: jobs.serviceName,
                description: jobs.description,
                offeredBy: { username: jobs.username }, // Assuming 'username' is used to populate the 'offeredBy' field
                imageUrl: jobs.imageUrl,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`, // Include token in headers
                }
            });

            console.log(response.data, "data");
            toast.success("Job added successfully");
            setJobs({ username: "", serviceName: "", description: "", imageUrl: "" }); // Clear form after submission
        } catch (error) {
            console.error("Error adding job:", error);
            toast.error("Failed to add job");
        } finally {
            setLoading(false);
        }
    };

    if (!localStorage.getItem("token")) {
        navigate("/login"); // Redirect with useNavigate
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

                <h1 className="text-3xl font-bold mb-6 text-center">Post the jobs here</h1>

                <h2 className="text-xl font-semibold mb-4 text-center">Add Job</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            onChange={(e) => setJobs({ ...jobs, username: e.target.value })}
                            value={jobs.username}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setJobs({ ...jobs, serviceName: e.target.value })}
                            value={jobs.serviceName}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter service name"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setJobs({ ...jobs, description: e.target.value })}
                            value={jobs.description}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter description"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setJobs({ ...jobs, description: e.target.value })}
                            value={jobs.description}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter description"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setJobs({ ...jobs, description: e.target.value })}
                            value={jobs.description}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter description"
                        />
                    </div>
                    <div>
                        <input type="file" name="image" id="image" 
                        onChange={(e) => setJobs({ ...jobs, imageUrl: e.target.value})}
                        value={jobs.imageUrl}
                         />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobs;
