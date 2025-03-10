import React, { useState } from "react";
import AllServices from "./AllServices";


// Reusable Card Component
const Card = ({ image, description }) => {
  return (
    <div className="max-w-sm mx-auto group overflow-hidden rounded-lg shadow-lg bg-white relative p-2" >
      {/* Card Image */}
      <div
        className="w-full h-[40vh] sm:h-[50vh] md:h-[55vh] bg-cover bg-center group-hover:scale-110 transition-transform duration-300 ease-in-out"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Description */}
      <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
        {description.map((line, index) => (
          <p className="text-lg" key={index}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};


// Main App Component
const Services = () => {
  const [showServices, setShowServices] = useState(false);
  const cards = [
    {
      image: 'https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_10_na5d3o',
      description: [
        "Get a tailored trim, fade, or styled cut based on your preference, ensuring a sharp and polished look.",
      ],
    },
    {
      image: 'https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_1_vkgc5n.jpg',
      description: [
        "Enhance your nails with our professional nail polish service, designed to give you a flawless, long-lasting finish.",
      ],
    },
    {
      image: 'https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_12_gihq6j',
      description: [
        "Our friendly barbers specialize in gentle, precise cuts and trims, ensuring a stylish yet age-appropriate look for every kid.",
      ],
    },
    {
      image: 'https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_4_h5x4ss.jpg',
      description: [
        "Rejuvenate your skin with our professional facial treatment, designed to cleanse, hydrate, and refresh your complexion.",
      ],
    },
  ];

  return (
    <div className="bg-red-100 landingi" id="services">
      <div className="services text-center default">
        {/* Title */}
        <div className="font-bold text-gray-700 text-3xl lg:text-4xl p-2 md:p-6 mt-1 md:mt-4">Top Services</div>

        {/* Cards Grid */}
        <div className="pt-6 md:pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {cards.map((card, index) => (
              <div key={index} className="p-0 md:p-4">
                <Card image={card.image} description={card.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Button to Show All Services */}
        <div className="pt-20">
          <button
            onClick={() => setShowServices(!showServices)}
            className="border border-gray-100 border-2 text-gray-100 py-2 px-6 hover:bg-gray-900 hover:text-white bg-gray-700"
          >
            {showServices ? "Hide Services" : "View All Services"}
          </button>

          {/* Conditionally render the imported component */}
          {showServices && <AllServices />}
        </div>
      </div>
    </div>
  );
};

export default Services;
