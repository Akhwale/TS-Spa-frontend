import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import axios from "axios";
import api from "../../../api";

export default function Appointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [staff_id, setStaff_id] = useState(null); // Staff ID state
  const [user_id, setUser_id] = useState(""); // User ID for logged-in user
  const [options, setOptions] = useState([]); // Service options
  const [staffOptions, setStaffOptions] = useState([]); // Staff options
  const [selected, setSelected] = useState([]); // Selected services
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setOptions(response.data.map((item) => ({ label: item.name, value: item.id })));
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await api.get("/staff");
        setStaffOptions(response.data.map((item) => ({ label: item.name, value: item.id })));
      } catch (error) {
        console.error("Error fetching staff data", error);
      }
    };

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

        setUser_id(response.data.id);
      } catch (error) {
        console.error("Error fetching user data", error);
        setUser_id("");
      }
    };

    fetchServices();
    fetchStaff();
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service_id = selected.map((service) => service.value);

    const formData = {
      date,
      time,
      user_id,
      staff_id,
      service_id,
    };

    try {
      const response = await api.post("/addAppointment", formData);
      setSuccessMessage("Appointment booked successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setDate("");
      setTime("");
      setUser_id("");
      setStaff_id("");
      setSelected([]);
    } catch (error) {
      console.error("Error handling the appointment", error);
      setSuccessMessage("");
    }
  };

  const customItemRenderer = ({ item, state, methods }) => (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevent dropdown closure on click
        methods.addItem(item); // Add or remove the item from selected
      }}
      className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-md"
    >
      <input
        type="checkbox"
        checked={state.values.some((val) => val.value === item.value)}
        onChange={() => methods.addItem(item)} // Add or remove item
        className="mr-3 h-5 w-5 accent-blue-500 cursor-pointer"
      />
      <span className="text-base font-medium text-gray-600">{item.label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="p-6 m-12 w-full bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">Schedule an Appointment</h1>

        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-4 text-center rounded-md">
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff</label>
            <Select
              options={staffOptions} // Populate with staff data
              values={staff_id ? [{ value: staff_id }] : []} // Pre-select value
              onChange={(values) => setStaff_id(values[0]?.value || null)} // Set selected staff_id
              placeholder="Select a staff member"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select a Service</label>
            <p className="text-sm text-gray-500">You can select multiple services from the list.</p>
            <Select
              options={options}
              values={selected}
              onChange={setSelected}
              multi={true}
              placeholder="Select options"
              className="w-full border border-gray-300 rounded-lg shadow-sm"
              itemRenderer={customItemRenderer} // Use the custom renderer
            />
          </div>

          <div>
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
