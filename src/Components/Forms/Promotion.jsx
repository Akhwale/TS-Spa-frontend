import { useEffect, useState } from "react";
import axios from "axios";

// MultiSelectDropdown Component
function MultiSelectDropdown({ services, selectedServices, handleServiceChange }) {
    return (
        <div className="relative">
            <p className="mb-2 font-semibold">Select a Service</p>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
                {services.map((service) => (
                    <label
                        key={service.id}
                        className="flex items-center space-x-2 mb-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value={service.id}
                            checked={selectedServices.includes(service.id)}
                            onChange={(e) =>
                                handleServiceChange(Number(e.target.value), e.target.checked)
                            }
                            className="form-checkbox"
                        />
                        <span>{service.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

// Main Promotion Component
export default function Promotion() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discount_percentage, setDiscountPercentage] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/services");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    // Handle checkbox changes
    const handleServiceChange = (serviceId, checked) => {
        if (checked) {
            setSelectedServices([...selectedServices, serviceId]);
        } else {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title,
            description,
            discount_percentage,
            isActive,
            service_id: selectedServices,
        };

        try {
            const response = await api.post("/addPromotion", formData);
            console.log("Promotion Added Successfully:", response.data);
        } catch (error) {
            console.error("Error adding promotion:", error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Set a Promotion</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Discount Percentage</label>
                    <input
                        type="text"
                        name="discount_percentage"
                        placeholder="Enter discount percentage"
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="form-checkbox"
                        />
                        <span>Is Active</span>
                    </label>
                </div>

                {/* Multi-Select Dropdown */}
                <MultiSelectDropdown
                    services={services}
                    selectedServices={selectedServices}
                    handleServiceChange={handleServiceChange}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
