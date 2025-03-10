import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../api";

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch appointments based on the current page
        api
            .get(`/displayServices?page=${currentPage}`)
            .then((response) => {
                setServices(response.data.data); // Set the appointments data
                setTotalPages(response.data.last_page); // Set total number of pages
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, [currentPage]); // Re-fetch appointments when page changes

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
                 Service List
            </h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Service</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Description</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr
                                key={service.id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition duration-300`}
                            >
                                <td className="py-3 px-6 text-gray-700">{service.name}</td>
                                <td className="py-3 px-6 text-gray-700">{service.description}</td>
                                <td className="py-3 px-6 text-gray-700">{service.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="flex items-center justify-center py-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-orange-500 text-gray-100 rounded-md hover:bg-orange-400"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
