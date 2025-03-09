import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";

const ViewAppointments = () => {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (userId) {
      api.get(`/appointments/${userId}?page=${currentPage}`)
        .then((response) => {
          setAppointments(response.data.data);
          setTotalPages(response.data.last_page);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [userId, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 bg-white-100 lg:bg-gray-100 pb-5 ">
      <img
        className="mx-auto pb-2 w-16"
        src="https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png"
      />

      <h2 className="text-lg font-semibold mb-4 text-center">
        View my Appointments
      </h2>

      {/* Table View for Larger Screens */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-lg">
        <table className="w-full min-w-[500px] md:min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-gray-200 text-sm md:text-base">
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">Date</th>
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">Time</th>
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">Services</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition duration-300`}
                >
                  <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">{appointment.date}</td>
                  <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">{appointment.time}</td>
                  <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">{appointment.services.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-600">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Smaller Screens */}
      <div className="md:hidden space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700 font-semibold">Date: {appointment.date}</p>
              <p className="text-gray-700">Time: {appointment.time}</p>
              <p className="text-gray-700">Services: {appointment.services.join(", ")}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No appointments found.</p>
        )}
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
};

export default ViewAppointments;
