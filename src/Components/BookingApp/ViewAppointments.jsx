import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";

const ViewAppointments = () => {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (userId) {
      api.get(`/appointments/${userId}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        View My Appointments
      </h2>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full min-w-[500px] md:min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-gray-200 text-sm md:text-base">
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">
                Date
              </th>
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">
                Time
              </th>
              <th className="py-3 px-4 md:px-6 text-left font-semibold uppercase">
                Services
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition duration-300`}
              >
                <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">
                  {appointment.date}
                </td>
                <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">
                  {appointment.time}
                </td>
                <td className="py-2 px-4 md:px-6 text-gray-700 text-sm md:text-base">
                  {appointment.services.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAppointments;
