import { useState, useEffect } from "react";
import api from "../../../api";
import { FaChevronDown, FaSpa } from "react-icons/fa";


const ServicesAccordion = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services from backend
    const fetchServices = async () => {
      try {
        const response = await api.get("/servicebyCategory"); // Replace with your actual API
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold text-center mb-6">
        Full <span className="text-gray-200">Service List</span>
      </h2>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-gray-600">Loading services...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={category.id} className="bg-white shadow-lg rounded-lg">
              {/* Accordion Header */}
              <button
                className="w-full flex justify-between items-center p-5 text-lg font-semibold bg-white hover:bg-gray-100 rounded-lg transition-all duration-300"
                onClick={() => toggleCategory(index)}
              >
                <div className="flex items-center space-x-3">
                   <FaSpa className="text-gray-500 text-2xl" />
                  <span>{category.name}</span>
                </div>
                <FaChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    openCategory === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion Content */}
              {openCategory === index && (
                <div className="p-5 bg-white border-t border-gray-200 space-y-3">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-md hover:bg-blue-100 transition-all shadow-sm"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-left">{service.name}</h3>
                        <p className="text-gray-600 text-sm text-left">{service.description}</p>
                      </div>
                      <span className="text-blue-600 font-bold">${service.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesAccordion;
