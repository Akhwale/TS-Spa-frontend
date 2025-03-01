import { useState } from "react";

import logo from "../../assets/images/img_15.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navigation (Visible on larger screens) */}
      <nav className="text-white px-12 py-4 flex justify-between items-center">
        <div className="text-xl font-bold"><img className="logo"src={logo}/></div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-orange-300 cursor-pointer">
          <a className="relative group" href="#index">
                Home
              <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a className="relative group" href="#services">
                Services
              <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a className="relative group" href="#booksession">
                Book Session
              <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a className="relative group" href="#testimonials">
                About
              <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none text-2xl" 
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Sidebar (Visible on mobile when open) */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <button 
          className="absolute top-4 right-4 text-2xl" 
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <ul className="mt-12 space-y-4 text-center">
          <li><a href="#" className="block py-2 hover:bg-gray-700">Home</a></li>
          <li><a href="#" className="block py-2 hover:bg-gray-700">About</a></li>
          <li><a href="#" className="block py-2 hover:bg-gray-700">Services</a></li>
          <li><a href="#" className="block py-2 hover:bg-gray-700">Contact</a></li>
          
        </ul>
      </div>
    </>
  );
};

export default Navbar;
