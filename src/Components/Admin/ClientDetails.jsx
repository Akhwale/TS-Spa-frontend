import { useEffect, useState } from "react";
import api from "../../../api";

export default function ClientsList() {
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        api.get(`/api/clients?page=${currentPage}`)
            .then((response) => {
                setClients(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, [currentPage]);

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
        <div className="max-w-6xl mx-auto mt-4 px-4 bg-white-100 lg:bg-gray-100 pb-5">
            <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png' />
            
            <h2 className="text-lg font-semibold mb-4 text-center">Registered Clients</h2>

            {/* Table for Larger Screens */}
            <div className="hidden md:block overflow-x-auto bg-white shadow-lg ">
                <table className="w-full min-w-[600px] table-auto">
                    <thead>
                        <tr className="bg-gray-800 text-gray-200 text-xs md:text-sm">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Phone</th>
                            <th className="py-2 px-4">Registered On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr
                                key={client.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-200 transition duration-300 text-xs md:text-sm`}
                            >
                                <td className="py-2 px-4 text-gray-700">{client.id}</td>
                                <td className="py-2 px-4 text-gray-700">{client.name}</td>
                                <td className="py-2 px-4 text-gray-700">{client.email}</td>
                                <td className="py-2 px-4 text-gray-700">{client.phone || "Not Provided"}</td>
                                <td className="py-2 px-4 text-gray-700">{client.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card Layout for Small Screens */}
            <div className="md:hidden space-y-4">
                {clients.map((client) => (
                    <div key={client.id} className="border rounded-lg shadow p-3 bg-gray-50">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Name:</span> {client.name}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Email:</span> {client.email}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Phone:</span> {client.phone || "Not Provided"}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Registered On:</span> {client.created_at}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4 text-xs md:text-sm">
                <button
                    onClick={handlePrevPage}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="flex items-center justify-center py-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="px-3 py-2 bg-orange-500 text-gray-100 rounded-md hover:bg-orange-400"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}