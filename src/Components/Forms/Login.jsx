import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

import logo from "../../assets/images/img_15.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);  // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is being submitted

    const formData = {
      email,
      password,
    };

    try {
      const response = await api.post("/api/login", formData);
      
      // Save the token to localStorage
      const token = response.data?.data?.token;
      
      if (token) {
        localStorage.setItem("authToken", token);

        console.log("User logged in successfully", response.data);

        // Clear the form on successful login
        setEmail("");
        setPassword("");
        setErrorMessage("");

        // Redirect to the booked appointment page
        navigate("/book-appointment");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in", error.response?.data?.message || error.message);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="landing min-h-screen flex flex-col justify-center">
    <div className="p-6 max-w-lg mx-auto bg-gray-900/40 w-full rounded-xl">

      <div className="text-4xl font-bold flex justify-around">
        <img className="logo" src={logo} />
      </div>

      <h1 className="text-2xl text-gray-300 font-bold mb-4">Login</h1>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-gray-400 focus:border-gray-400"
            required
          />
        </div>
  
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-gray-400 focus:border-gray-400"
            required
          />
        </div>
  
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
