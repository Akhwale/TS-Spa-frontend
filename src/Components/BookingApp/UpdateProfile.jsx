import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch user data when component mounts
    useEffect(() => {
        
                const fetchUserData = async () => {
                    try {
                      const token = localStorage.getItem("authToken");
                      if (!token) {
                        console.error("No token found, user not authenticated");
                        setUser_id("");
                        return;
                      }
              
                      const response = await api.get("/api/user", {
                        headers: { Authorization: `Bearer ${token}` },
                      });
              
                      setFormData({
                        name: response.data.name || '',
                        email: response.data.email || '',
                        phone_number: response.data.phone_number || '',
                        date_of_birth: response.data.date_of_birth || '',
                    });
                    setLoading(false);
                    } catch (error) {
                      console.error("Error fetching user data", error);
                      setUser_id("");
                    }
                  };

        fetchUserData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the updated data to the backend to update the profile
            const response = await api.put('/api/user', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            setSuccessMessage('Profile updated successfully!');
            setError(null);
            console.log(response.data); // Response from the server
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while updating the profile');
            setSuccessMessage('');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="p-2 md:p-6 m-2 md:m-12 w-full bg-white shadow-lg">
            <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png'/>

                <h2 className="text-lg font-semibold mb-4 text-center">Update Profile</h2>

                {successMessage && (
                    <div className="bg-green-500 text-white p-2 mb-4 text-center rounded-md">
                        <span>{successMessage}</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white p-2 mb-4 text-center rounded-md">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="date_of_birth" className="block text-sm font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
