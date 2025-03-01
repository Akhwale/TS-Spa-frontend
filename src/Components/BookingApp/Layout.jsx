import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import api from "../../../api";

const SidebarLayout = () => {
  const [user, setUser] = useState(null);  // State to store user data
  const navigate = useNavigate();  // Get navigate function

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await api.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
            },
          });

          // Set user data from the response
          if (response.data) {
            setUser(response.data);  // Store the entire user object in state
          } else {
            console.error("User data not found in response:", response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Check if error response contains a message
          if (error.response) {
            console.error("Error response data:", error.response.data);
          }
        }
      } else {
        console.error("No token found. User may not be authenticated.");
        navigate("/login");  // Redirect to login if no token is found
      }
    };

    fetchUserData();  // Call the function to fetch user data
  }, [navigate]);  // Empty dependency array to run this effect only once on mount


  // Redirect to a default child route if no specific route is loaded
  useEffect(() => {
    if (location.pathname === "/book-appointment") {
      navigate("appointment"); // Automatically load "appointment" page
    }
  }, [location, navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // Make an API request to the backend to logout
        await api.post(
          "/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Remove the token from localStorage and redirect to login
        localStorage.removeItem("authToken");
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      console.error("No token found. User may already be logged out.");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 text-center">
        <nav>
          <ul className="space-y-4">
            <li>
              <div className="pt-36 px-14">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-white to-white p-1">
                    {/* Inner Circle (Avatar) */}
                    <div className="w-full h-full flex justify-center items-center rounded-full bg-gray-400">
                      <FaUserAlt className="text-5xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <div className="pb-12 text-center">
                {/* Display user name if available */}
                {user ? user.name : "Loading..."}
              </div>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="appointment" className="hover:text-gray-100 hover:font-bold">
                New Appointment
              </Link>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="services" className="hover:text-gray-100 hover:font-bold">
                View Service List
              </Link>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to={user ? `view/${user.id}` : '/login'} className="hover:text-gray-100 hover:font-bold">
                View my Appointments
              </Link>
            </li>

              <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
                          <Link to="appointments" className="hover:text-gray-100 hover:font-bold">
                            Booked Appointments
                          </Link>
                        </li>
            
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="profile" className="hover:text-gray-100 hover:font-bold">
                Update Profile
              </Link>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-1 px-6 rounded-medium hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        <Outlet context={{ userId: user ? user.id : null }}/>
      </main>
    </div>
  );
};

export default SidebarLayout;
