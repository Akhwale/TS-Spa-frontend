import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import api from "../../../api";

const ViewAppointments = () => {
  const { userId } = useParams();  // Extract the userId from the URL
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch appointments for the specific user using the userId
      api.get(`/appointments/${userId}`)
        .then((response) => {
          setAppointments(response.data);  // Set the fetched data to the state
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [userId]); // Re-run the effect if userId changes

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        View my Appointments
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">
                Date
              </th>
              <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">
                Time
              </th>
              <th className="py-3 px-6 text-left text-gray-200 font-semibold uppercase">
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
                <td className="py-3 px-6 text-gray-700">{appointment.date}</td>
                <td className="py-3 px-6 text-gray-700">{appointment.time}</td>
                <td className="py-3 px-6 text-gray-700">
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
