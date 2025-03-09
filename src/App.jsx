import { Routes, Route, Navigate } from "react-router-dom";
import NewAppointment from './Components/BookingApp/NewAppointment';
import ViewAppointments from './Components/BookingApp/ViewAppointments';
import BookedAppointments from "./Components/BookingApp/BookedAppointments";
import UpdateProfile from './Components/BookingApp/UpdateProfile';
import Layout from "./Components/BookingApp/Layout";

import AdminLayout from "./Components/Admin/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard";
import ClientDetails from './Components/Admin/ClientDetails'
import Staff from './Components/Forms/Staff'
import Service from './Components/Forms/Service'

import WebLayout from "./Components/Website/WebLayout";
import './App.css';

import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import ServiceList from "./Components/BookingApp/ServiceList";

// Function to check if user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  return token ? true : false;
};

// Function to get user role
const getUserRole = () => {
  return localStorage.getItem('userRole'); // Ensure you store 'admin' or 'user' during login
};

// Protected Route for authentication
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

// Role-Based Route for redirection
function RoleBasedRoute({ children }) {
  const role = getUserRole();

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  } 

  // Prevent unnecessary redirects if already on the correct page
  if (role === 'admin' && window.location.pathname === "/admin/dashboard") {
    return children;
  } else if (role !== 'admin' && window.location.pathname === "/book-appointment/appointment") {
    return children;
  }

  return role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/book-appointment/appointment" />;
}


function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate replace to="/website" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/website" element={<WebLayout />} />

        {/* Redirect based on role after login */}
        <Route path="/redirect" element={<RoleBasedRoute />} />

        {/* Protected Booking Routes for Users */}
        <Route path="/book-appointment" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="appointment" element={<NewAppointment />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="view/:userId" element={<ViewAppointments />} />
          <Route path="profile" element={<UpdateProfile />} />
          <Route path="appointments" element={<BookedAppointments />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<BookedAppointments />} />
          <Route path="profile" element={<UpdateProfile />} />
          <Route path="clients" element={<ClientDetails />} />
          <Route path="addStaff" element={<Staff/>} />
          <Route path="addService" element={<Service />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
