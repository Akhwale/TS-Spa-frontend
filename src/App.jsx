import { Routes, Route, Navigate } from "react-router-dom";
import NewAppointment from './Components/BookingApp/NewAppointment';
import ViewAppointments from './Components/BookingApp/ViewAppointments';
import BookedAppointments from "./Components/BookingApp/BookedAppointments";
import UpdateProfile from './Components/BookingApp/UpdateProfile';
import Layout from "./Components/BookingApp/Layout";

import WebLayout from "./Components/Website/WebLayout";
import './App.css';

import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import ServiceList from "./Components/BookingApp/ServiceList";
// import Dashboard from "./Components/Dashboard";


// Assume you have a method to check if the user is logged in (e.g., through context or local storage)
const isLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  return token ? true : false;  // Returns true if token exists
};


function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/website" element={<WebLayout />} />
      
        {/* Protected Routes */}
        <Route path="/book-appointment" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="appointment" element={<NewAppointment />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="view/:userId" element={<ViewAppointments />} />
          <Route path="profile" element={<UpdateProfile />} />
          <Route path="appointments" element={<BookedAppointments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
