import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import api from "../../../api";

export default function Staff() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data.map((item) => ({ label: item.name, value: item.id })));
      } catch (error) {
        console.error("Failing to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  const toggleSelection = (service) => {
    setSelectedServices((prev) =>
      prev.some((item) => item.value === service.value)
        ? prev.filter((item) => item.value !== service.value)
        : [...prev, service]
    );
  };

  const removeSelection = (service) => {
    setSelectedServices((prev) => prev.filter((item) => item.value !== service.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service_id = selectedServices.map((service) => service.value);

    const formData = { name, email, phone_number, isAvailable, service_id };

    try {
      await api.post("/addStaff", formData);
      setSuccessMessage("Staff added successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setName("");
      setEmail("");
      setPhone_number("");
      setIsAvailable(false);
      setSelectedServices([]);
    } catch (error) {
      console.error("Problem Adding staff", error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center justify-column items-center min-h-screen bg-white-100 lg:bg-gray-100 w-full">
   
    <div className="p-2 md:p-6 m-2 md:m-12 w-full bg-white shadow-lg ">
     
    <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png'/>

     <h2 className="text-lg font-semibold mb-4 text-center">Add a New Staff</h2>
        
        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-4 text-center rounded-md">
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            required
          />

          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            required
          />

          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          {/* Services Multi-Select Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium">Select Services</label>
            <div
              className="w-full flex items-center flex-wrap bg-gray-100 p-2 rounded-lg min-h-[42px] cursor-pointer"
              onClick={() => setIsServiceOpen(!isServiceOpen)}
            >
              {selectedServices.length > 0 ? (
                selectedServices.map((service) => (
                  <span
                    key={service.value}
                    className="flex items-center bg-blue-700 text-gray-200 px-2 py-1 rounded-lg mr-2 mb-1 text-xs"
                  >
                    {service.label}
                    <X
                      size={14}
                      className="ml-1 cursor-pointer text-blue-700 hover:text-red-600 text-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelection(service);
                      }}
                    />
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">Select services provided by this staff member.</p>
              )}
              <span className="ml-auto">{isServiceOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </div>

            {isServiceOpen && (
              <div className="relative w-full mt-2 bg-white shadow-md rounded-lg p-2 space-y-2 absolute z-10 max-h-[200px] overflow-y-auto">
                {services.map((service) => (
                  <label
                    key={service.value}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.some((item) => item.value === service.value)}
                      onChange={() => toggleSelection(service)}
                      className="w-4 h-4"
                    />
                    <span>{service.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
}
