import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [navButton, setNavButton] = useState(false);
  const [users, setUsers] = useState(false); // Toggle for user profile section
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [showFileInput, setShowFileInput] = useState(false); // To toggle file input visibility
  const navigate = useNavigate();

  const toggleUser = () => {
    setUsers(!users);
  };

  const toggleButton = () => {
    setNavButton(!navButton);
  };

  const handleImageClick = () => {
    setShowFileInput(true); // Show the file input when the profile image is clicked
  };

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
        setImage(updatedUser.imageUrl); // Update the image preview
        setShowFileInput(false); // Hide the file input after the upload
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div>
      <div className='bg-rato'>
        <div className='flex justify-between items-center px-3 md:px-24 py-3'>
          <div className="nav-logo text-2xl font-extrabold">
            <NavLink to='/' className='font-logo text-2xl'>Mero Kaam</NavLink>
          </div>
          <div className="nav-list gap-20 hidden md:flex items-center text-xl font-ajhai-arko">
            <NavLink className={({ isActive }) => isActive ? "active text-blue-400" : "text-xer"} to='/addjobs'>
              Switch to selling
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active text-blue-400" : "text-black"} to='/about'>
              About
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active text-blue-400" : "text-black"} to='/something'>
              Inquiry
            </NavLink>
            <div className='bg-black px-10 py-2 text-white rounded-md'>
              <button onClick={toggleUser}>User</button>
            </div>
          </div>
          <button onClick={toggleButton} className='flex md:hidden'>
            <img src="./src/assets/main-menu.png" alt="" className='w-9' />
          </button>
        </div>
      </div>

      <div className='md:hidden flex flex-col relative '>
        {navButton && (
          <div className='bg-gray-200 absolute right-0 rounded-lg top-0 h-screen w-screen p-3 z-20'>
            <ul className='flex flex-col gap-5'>
              <li>Switch</li>
              <li>About</li>
              <li>Something</li>
            </ul>
          </div>
        )}
      </div>

      <div className='absolute z-10 right-0'>
        {users && (
          <div className="min-h-screen w-[40vh] flex flex-col items-center bg-gray-50">
            <div className="max-w-3xl w-full rounded-lg p-6">
              <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
              {user ? (
                <div>
                  <div className="mt-4 text-center"> 
                    <img
                      src={image}
                      alt="User profile"
                      className="w-24 h-24 rounded-full mx-auto cursor-pointer"
                      onClick={handleImageClick} // Handle image click
                    />
                  </div>
                  {showFileInput && (
                    <form onSubmit={handleUpload} className="mt-4">
                      <div className="mb-4">
                        <input type="file" name="image" id="image" className="mt-1" required />
                      </div>
                      <button
                        type="submit"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                 <div className='flex flex-col gap-8 mt-6'>
                 <div className="mt-4">
                    <p className="text-xl font-semibold">Username:</p>
                    <p className="text-gray-700">{user.username}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xl font-semibold">Email:</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                 </div>
                </div>
              ) : (
                <p className="text-center text-gray-600">No user data available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
