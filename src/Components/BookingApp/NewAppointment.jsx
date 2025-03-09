import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import api from "../../../api";

export default function AppointmentForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [staff_id, setStaff_id] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [options, setOptions] = useState([]); // Service options
  const [staffOptions, setStaffOptions] = useState([]); // Staff options
  const [selected, setSelected] = useState([]); // Selected services
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
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

  const toggleSelection = (option) => {
    setSelected((prev) =>
      prev.some((item) => item.value === option.value)
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option]
    );
  };

  const removeSelection = (option) => {
    setSelected((prev) => prev.filter((item) => item.value !== option.value));
  };

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
      await api.post("/addAppointment", formData);
      setSuccessMessage("Appointment booked successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setDate("");
      setTime("");
      setStaff_id(null);
      setSelected([]);
    } catch (error) {
      console.error("Error handling the appointment", error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center justify-column items-center min-h-screen bg-white-100 lg:bg-gray-100 w-full">
   
     <div className="p-2 md:p-6 m-2 md:m-12 w-full bg-white shadow-lg ">
      
     <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png'/>

      <h2 className="text-lg font-semibold mb-4 text-center">Schedule an Appointment</h2>
     

      {successMessage && (
           <div className="bg-green-500 text-white p-2 mb-4 text-center rounded-md">
             <span>{successMessage}</span>
           </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        {/* Time Input */}
        <label className="block text-sm font-medium mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        {/* Staff Dropdown */}
        <div className="w-full relative">
          <label className="block text-sm font-medium mb-1">Staff Preference</label>

          <button
            type="button"
            onClick={() => setIsStaffOpen(!isStaffOpen)}
            className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-md text-sm  text-gray-700 mb-1"
          >
            {staff_id
              ? staffOptions.find((staff) => staff.value === staff_id)?.label || "Select a staff member"
              : "Select a staff member"}
            {isStaffOpen ? <ChevronUp /> : <ChevronDown />}
          </button>

          {isStaffOpen && (
            <div className="relative w-full mt-1 bg-white shadow-md rounded-md border p-1 space-y-1 z-10 text-sm border ">
              {staffOptions.map((staff) => (
                <div
                  key={staff.value}
                  className="p-2 hover:bg-blue-100 cursor-pointer border-b last:border-none"
                  onClick={() => {
                    setStaff_id(staff.value);
                    setIsStaffOpen(false);
                  }}
                >
                  {staff.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Services Multi-Select Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select a Service</label>
          <div
            className="w-full flex items-center flex-wrap bg-gray-100 p-2 rounded-lg min-h-[42px] cursor-pointer"
            onClick={() => setIsServiceOpen(!isServiceOpen)}
          >
            {selected.length > 0 ? (
              selected.map((option) => (
                <span
                  key={option.value}
                  className="flex items-center bg-blue-700 text-gray-200 px-2 py-1 rounded-lg mr-2 mb-1 text-xs "
                >
                  {option.label}
                  <X
                    size={14}
                    className="ml-1 cursor-pointer text-blue-700 hover:text-red-600 text-gray-200 "
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelection(option);
                    }}
                  />
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">You can select multiple services from the list.</p>
            )}
            <span className="ml-auto">{isServiceOpen ? <ChevronUp /> : <ChevronDown />}</span>
          </div>

          {isServiceOpen && (
            <div className="relative w-full mt-2 bg-white shadow-md rounded-lg p-2 space-y-2 absolute z-10 max-h-[200px] overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-none"
                >
                  <input
                    type="checkbox"
                    checked={selected.some((item) => item.value === option.value)}
                    onChange={() => toggleSelection(option)}
                    className="w-4 h-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
      </div>
    </div>
  );
}
