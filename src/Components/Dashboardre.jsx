import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Website/Header";
import Index from "./Website/Index";
import Catalog from "./Catalog";
import Footer from "./Footer";
import Reviews from "./Reviews";
import Swipe from "./Swipe";
import Services from "./Website/Services";
import Yoh from "./Website/Testimonials";
import Booking from "./Website/BookSession";
import Visible from "./Visible";
import Tabbed from "./Website/AllServices";


import slide_image_1 from '../assets/images/img_1.jpg';
import slide_image_2 from '../assets/images/img_2.jpg';
import slide_image_3 from '../assets/images/img_3.jpg';
import slide_image_4 from '../assets/images/img_4.jpg';
import Procedure from "./Website/Procedure";





export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State to store the username

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          // Fetch user details using the API token
          const response = await api.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          });

          // Extract the username from the response
          setUsername(response.data.name); // Assuming `name` is returned in the API response
        } catch (error) {
          console.error("Error fetching user details:", error);

          // Redirect to login if the token is invalid or expired
          navigate("/login");
        }
      } else {
        navigate("/login"); // Redirect to login if no token found
      }
    };

    fetchUser();
  }, [navigate]);

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
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          }
        );

        // Remove the token from localStorage and redirect
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
    <div className="mx-auto">
    
    
      


      {/* iNDEX */}

      <div className="landing">
        
     {/* header */}

     <div className="w-full bg-gray-100 bg-opacity-60 mt-12 absolute py-4 px-2">
            
            <div className="flex justify-between">
                <div className="logo">
                    Logo
                </div>

                <div className="links ">
                    <li className="flex gap-2">
                        <ul>Home</ul>
                        <ul>Services</ul>
                        <ul>About</ul>
                        <ul>Contact Us</ul>
                    </li>
                </div>

              


                <div className="signup">
  <li className="flex gap-1">
    {localStorage.getItem("authToken") ? (
      // Show Logout button when logged in
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    ) : (
      // Show Register/Login buttons when not logged in
      <>
        <ul>Register</ul>
        <ul>/</ul>
        <ul>Login</ul>
      </>
    )}
  </li>
</div>








            </div>

        </div>









        <div className=" flex justify-center items-center h-[100vh]">
        <div className="text-center">
          

          {/* Display the username */}
      <p className="text-lg">Welcome, {username || "User"}!</p> 






          <button className="border px-10 py-3 border-gray-200 text-white font-bold">Book an Appointment</button>
          <p className="mt-4 text-gray-600 text-white text-lg">Relax, refresh, and redefine your style – schedule your visit today!</p>
          <Visible />
        </div>
      </div>
      
      </div>

      <Services />

      <Procedure/>

    <Tabbed />
{/* 
      <Catalog />

    

      <Reviews />

     

            <Services />


     


      <Swipe />*/}

      <Booking />

      
    <Yoh /> 

      <Footer />      
      
      
    </div>
  );
}
