import { useState, useEffect } from "react";
import api from "../../../api";

export default function Service() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      description: description,
      price: Number(price),  // Convert to number
      duration_in_mins: Number(duration),  // Convert to number
      category_id: Number(category_id),  // Convert to number
      isActive: isActive ? 1 : 0,  // Convert boolean to 0/1
    };
    
    await api.post("/addService", formData); 
   
    try {
      await api.post("/addService", formData);
     
      setSuccessMessage("Service added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      setCategory_id("");
      setIsActive(false);


    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100 lg:bg-gray-100 w-full">
      <div className="p-2 md:p-6 m-2 md:m-12 w-full bg-white shadow-lg">
        <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png' />
        <h2 className="text-lg font-semibold mb-4 text-center">Add a New Service</h2>

        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-4 text-center rounded-md">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Service Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-md text-sm" required />

          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md text-sm" required />

          <label className="block text-sm font-medium">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded-md text-sm" required />

          <label className="block text-sm font-medium">Duration (minutes)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 border rounded-md text-sm" required />

          <label className="block text-sm font-medium">Category</label>
          <select value={category_id} onChange={(e) => setCategory_id(e.target.value)} className="w-full p-2 border rounded-md text-sm">
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <label className="flex items-center space-x-2 text-sm font-medium">
            <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} className="w-4 h-4" />
            <span>Active</span>
          </label>

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
}
