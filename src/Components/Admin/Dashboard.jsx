import { useState, useEffect } from "react";
import api from "../../../api";

export default function Dashboard() {
    const [data, setData] = useState({
        total_appointments: 0,
        total_users: 0,
        total_staff: 0
    });

    useEffect(() => {
        api.get("/dashboard/data")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching dashboard data:", error);
            });
    }, []);

    return (
        <div className="p-3 md:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 px-8 md:px-0">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card 1: Appointments */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-lg font-semibold">Total Appointments</h2>
        <p className="text-blue-200">Booked this month</p>
        <p className="text-4xl font-bold mt-2">{data.total_appointments}</p>
    </div>

    {/* Card 2: Staff Members */}
    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-lg font-semibold">My Staff Members</h2>
        <p className="text-green-200">Currently active</p>
        <p className="text-4xl font-bold mt-2">{data.total_staff}</p>
    </div>

    {/* Card 3: Registered Customers */}
    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-lg font-semibold">Registered Clients</h2>
        <p className="text-pink-200">Total clients</p>
        <p className="text-4xl font-bold mt-2">{data.total_users}</p>
    </div>

    {/* Card 4: Revenue */}
    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
        <h2 className="text-lg font-semibold">Total Revenue</h2>
        <p className="text-yellow-200">This month</p>
        <p className="text-4xl font-bold mt-2">$12,500</p>
    </div>
</div>


            {/* Top 5 Clients Table */}
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Top 5 Clients</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">Client Name</th>
                            <th className="p-3">Appointments Booked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: "John Doe", appointments: 15 },
                            { name: "Jane Smith", appointments: 12 },
                            { name: "Alice Johnson", appointments: 10 },
                            { name: "Michael Brown", appointments: 9 },
                            { name: "Emily Davis", appointments: 8 },
                        ].map((client, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{client.name}</td>
                                <td className="p-3">{client.appointments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Recent Appointments */}
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
                <ul>
                    {[
                        { client: "John Doe", date: "2025-03-05", status: "Completed" },
                        { client: "Jane Smith", date: "2025-03-06", status: "Pending" },
                        { client: "Alice Johnson", date: "2025-03-07", status: "Completed" },
                        { client: "Michael Brown", date: "2025-03-08", status: "Canceled" },
                        { client: "Emily Davis", date: "2025-03-09", status: "Pending" },
                    ].map((appointment, index) => (
                        <li key={index} className="border-t py-2 flex flex-wrap justify-between">
                            <span>{appointment.client}</span>
                            <span>{appointment.date}</span>
                            <span className={`px-2 py-1 rounded-lg text-white ${appointment.status === "Completed" ? "bg-green-500" : appointment.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                                {appointment.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
