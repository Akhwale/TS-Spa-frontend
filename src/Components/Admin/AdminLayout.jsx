import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import api from "../../../api";

const SidebarLayout = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await api.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/book-appointment") {
      navigate("appointment");
    }

    // Close sidebar when route changes (useful for mobile)
    setIsSidebarOpen(false);
  }, [location, navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await api.post("/api/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.removeItem("authToken");
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Toggle Button for Mobile */}
      <button 
            className={`absolute top-4 left-2 z-50 text-2xl md:hidden transition-colors duration-200
              ${isSidebarOpen ? "text-gray-200" : "text-gray-700"}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-56 md:w-60 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:flex`}
      >
        <nav className="w-full">
          <ul className="space-y-4">
            <li>
              <div className="pt-36 px-10 md:px-14">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full flex justify-center items-center rounded-full bg-gray-400">
                      <FaUserAlt className="text-5xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3 text-center">
              {user ? user.name : "Loading..."}
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="dashboard" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="appointments" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                Booked Appointments
              </Link>
            </li>

            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="clients" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                My Cients' Details
              </Link>
            </li>

            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="addStaff" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                Add Staff
              </Link>
            </li>

            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="addService" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                Add a service
              </Link>
            </li>
           
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <Link to="profile" className="hover:text-gray-100 hover:font-bold" onClick={() => setIsSidebarOpen(false)}>
                Update Profile
              </Link>
            </li>
           
            <li className="border-b border-gray-500 hover:border-gray-400 pb-3">
              <button
                onClick={() => { handleLogout(); setIsSidebarOpen(false); }}
                className="bg-red-600 text-white py-1 px-6 rounded hover:bg-red-700 w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <Outlet context={{ userId: user ? user.id : null }} />
      </main>
    </div>
  );
};

export default SidebarLayout;
