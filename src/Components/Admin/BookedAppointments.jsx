import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../api";

export default function BookedAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        api.get(`/appointments?page=${currentPage}`)
            .then((response) => {
                setAppointments(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
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
            <img className="mx-auto pb-2 w-16" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/v1741260322/TS%20Spa/logo.png' />

            <h2 className="text-lg font-semibold mb-4 text-center">Booked Appointments</h2>

            {/* 🖥️ Table for Larger Screens */}
            <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="w-full min-w-[600px] table-auto">
                    <thead>
                        <tr className="bg-gray-800 text-gray-200 text-xs md:text-sm">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Client Name</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Time</th>
                            <th className="py-2 px-4">Services</th>
                            <th className="py-2 px-4">Preferred Attendee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr
                                key={appointment.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-200 transition duration-300 text-xs md:text-sm`}
                            >
                                <td className="py-2 px-4 text-gray-700">{appointment.id}</td>
                                <td className="py-2 px-4 text-gray-700">
                                    {appointment.user?.name || "Client Not Available"}
                                </td>
                                <td className="py-2 px-4 text-gray-700">{appointment.date}</td>
                                <td className="py-2 px-4 text-gray-700">{appointment.time}</td>
                                <td className="py-2 px-4 text-gray-700">
                                    {appointment.services?.map((service, index) => (
                                        <span key={service.id}>
                                            {service.name}
                                            {index < appointment.services.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </td>
                                <td className="py-2 px-4 text-gray-700">
                                    {appointment.staff?.name || "Attendee Not Assigned"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📱 Card Layout for Small Screens */}
            <div className="md:hidden space-y-4">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg shadow p-3 bg-gray-50">
                       
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Client:</span> {appointment.user?.name || "Client Not Available"}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Date:</span> {appointment.date}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Time:</span> {appointment.time}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Services:</span> 
                            {appointment.services?.map((service, index) => (
                                <span key={service.id}>
                                    {service.name}
                                    {index < appointment.services.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Attendee:</span> {appointment.staff?.name || "Attendee Not Assigned"}
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
