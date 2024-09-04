import { useNavigate, useState, useEffect } from "react-router-dom";

export const useUsers = () => {
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
return { services, error, loading };

}