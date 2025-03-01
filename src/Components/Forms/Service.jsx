import { useState, useEffect } from "react";
import axios from "axios";

export default function Service() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories"); // Replace with your API endpoint
        setCategories(response.data); // Assuming `response.data` is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      price,
      duration,
      category_id,
      isActive,
    };

    try {
      const response = await api.post("/addService", formData); // Replace with your API endpoint
      console.log("Service added successfully:", response.data);

      // Reset the form fields
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="category_id">Category</label>
      <select
        name="category_id"
        id="category_id"
        value={category_id}
        onChange={(e) => setCategory_id(e.target.value)} // Corrected onChange
        required
      >
        <option value="">-- Select a Category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (in mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Is Active
      </label>

      <button type="submit">Add a Service</button>
    </form>
  );
}
