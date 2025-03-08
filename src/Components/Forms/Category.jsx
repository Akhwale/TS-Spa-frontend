import { useState } from "react";
import axios from "axios";

export default function Category() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, description }
        try {

            const response = await api.post('/addCategory', formData);
            console.log("Category added successfully:", response.data);

        }
        catch (error) {
            console.error('Error Handling category', error);

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
            <div className="p-6 m-12 w-full bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-8 text-center">Create a New Category</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Submit Button */}
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

    )
}