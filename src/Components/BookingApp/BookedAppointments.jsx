import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../api";

export default function BookedAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch appointments based on the current page
        api
            .get(`/appointments?page=${currentPage}`)
            .then((response) => {
                setAppointments(response.data.data); // Set the appointments data
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
                Appointments Queue
            </h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">ID</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Client Name</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Time</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Services</th>
                            <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">Preferred Attendee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr
                                key={appointment.id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition duration-300`}
                            >
                                <td className="py-3 px-6 text-gray-700">{appointment.id}</td>
                                <td className="py-3 px-6 text-gray-700">{appointment.user?.name || "Client Not Available"}</td>
                                <td className="py-3 px-6 text-gray-700">{appointment.date}</td>
                                <td className="py-3 px-6 text-gray-700">{appointment.time}</td>
                                <td className="py-3 px-6 text-gray-700">
                                    {appointment.services?.map((service, index) => (
                                        <span key={service.id}>
                                            {service.name}
                                            {index < appointment.services.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </td>
                                <td className="py-3 px-6 text-gray-700">{appointment.staff?.name || "Attendee Not Assigned"}</td>
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
