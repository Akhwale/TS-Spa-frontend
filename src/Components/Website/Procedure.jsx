import { FaSpa, FaCalendarAlt, FaInfoCircle, FaCreditCard } from 'react-icons/fa';

export default function Procedure() {
    return (
        <div className="default">
            <section className="text-gray-700 body-font">
                <div className="container px-0 py-16 mx-auto">
                    <div className="flex flex-wrap text-center">
                        {/* Step Cards */}
                        {[
                            {
                                icon: <FaSpa className="text-6xl sm:text-7xl text-gray-400 hover:text-gray-500 transition-colors duration-300 bg-white p-2 rounded-full border-2 border-gray-400" />,
                                step: "1",
                                title: "Choose Your Service",
                                details: ["(e.g., massage, facial, manicure).", "View descriptions and prices"]
                            },
                            {
                                icon: <FaCalendarAlt className="text-5xl sm:text-6xl text-gray-400 hover:text-gray-500 transition-colors duration-300" />,
                                step: "2",
                                title: "Select a Date and Time",
                                details: ["Browse the availability calendar.", "Pick a convenient date & time"]
                            },
                            {
                                icon: <FaInfoCircle className="text-6xl sm:text-7xl text-gray-400 hover:text-gray-500 transition-colors duration-300 bg-white p-2 rounded-full border-2 border-gray-400" />,
                                step: "3",
                                title: "Provide Just enough Info",
                                details: ["(e.g., name, contact number, email).", "Mention any special requests"]
                            },
                            {
                                icon: <FaCreditCard className="text-5xl sm:text-6xl text-gray-400 hover:text-gray-500 transition-colors duration-300" />,
                                step: "4",
                                title: "Confirm your appointment",
                                details: ["Review your appointment details.", "Confirm your appointment."]
                            }
                        ].map((item, index) => (
                            <div key={index} className="p-2 sm:p-4 w-1/2 sm:w-1/2 md:w-1/4">
                                <div className="border px-2 py-6 sm:py-8 md:py-10 rounded-lg shadow-lg transform transition duration-500 hover:scale-110 flex flex-col h-full">
                                    <div className="flex flex-col items-center justify-center text-center space-y-2 flex-grow">
                                        {/* Icon */}
                                        <div className="flex items-center justify-center text-white p-4 rounded-full border-2 border-gray-400">
                                            {item.icon}
                                        </div>

                                        {/* Step Number */}
                                        <div className="flex items-center justify-center bg-gray-400 text-white p-1 rounded-full w-6 h-6">
                                            <span className="text-lg font-semibold">{item.step}</span>
                                        </div>

                                        {/* Title */}
                                        <p className="text-sm font-semibold">{item.title}</p>

                                        {/* Details */}
                                        {item.details.map((detail, i) => (
                                            <p key={i} className="text-xs text-gray-400">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
