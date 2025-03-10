import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    setError(""); // Clear any existing error
    const formData = {
      name,
      email,
      password,
      password_confirmation,
    };

    try {
      const response = await api.post(
        "/api/register",
        formData
      );
      console.log("User registered successfully", response.data);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error registering a user", error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="landing min-h-screen flex flex-col justify-around">
       <div className="p-6 max-w-lg mx-auto bg-gray-900/40 w-full rounded-xl">
       <div className="text-4xl font-bold flex justify-around">
        <img className="logo" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png' />
      </div>

      <h1 className="text-xl text-gray-300 font-bold mb-4">Register</h1>
      <h1 className="text-sm text-gray-300 mb-4">Let us get to know you a little....</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-gray-400 focus:border-gray-400"
          />

        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Email Address</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-gray-400 focus:border-gray-400"
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
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-gray-400 focus:border-gray-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>


        <div className="text-white">
            <p className="text-right pb-5">Already have an account? <span className="font-bold cursor-pointer"><a href="login">Login</a></span></p>
        </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
      </div>
  );
}
