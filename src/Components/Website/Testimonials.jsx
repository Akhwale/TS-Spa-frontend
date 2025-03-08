import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from 'react-icons/fa';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';

const Testimonials = () => {
  const swiperRef = useRef(null);

  const testimonials = [
    { name: "John Doe", position: "CEO of XYZ Corp", text: "This is an amazing product! It has transformed the way we do business.", rating: 4 },
    { name: "Jane Smith", position: "Marketing Director", text: "I can't imagine our workflow without this tool. It saved us so much time and effort.", rating: 5 },
    { name: "Robert Brown", position: "Product Manager", text: "Excellent customer service and fantastic features. Highly recommend!", rating: 3 },
    { name: "Sarah Lee", position: "CTO of Acme Inc", text: "A game-changer for our business. The support team is exceptional!", rating: 4 },
    { name: "James Clark", position: "Founder of Startup X", text: "Highly recommend! The product is easy to use and provides fantastic value.", rating: 5 },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar className="text-yellow-400" key={i} />);
      } else if (i - rating === 0.5) {
        stars.push(<FaStarHalfAlt className="text-yellow-400" key={i} />);
      } else {
        stars.push(<FaRegStar className="text-yellow-400" key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 lg:min-h-screen" id="testimonials">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center mt-16">Get it straight from our happy clients.</h2>
      <p className="italic text-center max-w-2xl mx-auto hidden md:block">
        "At Project Spa, our clients' happiness is our top priority. We take pride in creating relaxing, rejuvenating experiences that leave them looking and feeling their best."
      </p>
      
      <div className="relative mt-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={false}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4"
          ref={swiperRef}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <FaQuoteRight className="text-5xl text-gray-500 mb-4" />
                <div className="flex justify-center items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full bg-white p-1 flex justify-center items-center">
                      <FaUserAlt className="text-4xl text-gray-400" />
                    </div>
                  </div>
                </div>
                <p className="text-lg italic text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-center mb-4">{renderStars(testimonial.rating)}</div>
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - Fixed for Mobile & Desktop */}
        <button
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <FaArrowRight />
        </button>
      </div>

      <p className="italic text-center max-w-2xl mx-auto mt-6 mb-10 lg:mb-0">
        "Your trust and kind words fuel our commitment to excellence. Every visit is a step toward your well-being, and we’re grateful to be part of your journey."
      </p>
    </div>
  );
};

export default Testimonials;
