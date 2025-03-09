import { useState } from "react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navigation (Visible on larger screens) */}
      <nav className="navbar fixed top-0 w-full text-white px-2 lg:px-10 py-3 flex justify-between items-center shadow-lg z-30">

       <a href="#index"><img className="logo"src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png'/></a>
        
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
          className="md:hidden text-white focus:outline-none text-3xl" 
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Sidebar (Visible on mobile when open) */}
      <div className={`sidenav fixed top-0 right-0 w-64 h-full bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden z-50`}>
        <button 
          className="absolute top-4 right-4 text-2xl" 
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <ul className="mt-20 space-y-5 text-center">
        <li>
    <a className="relative group" href="#index" onClick={() => setIsOpen(false)}>
      Home
    </a>
  </li>
  <li>
    <a className="relative group" href="#services" onClick={() => setIsOpen(false)}>
      Services
    </a>
  </li>
  <li>
    <a className="relative group" href="#booksession" onClick={() => setIsOpen(false)}>
      Book Session
    </a>
  </li>
  <li>
    <a className="relative group" href="#testimonials" onClick={() => setIsOpen(false)}>
      About
    </a>
  </li>
          
        </ul>
      </div>
    </>
  );
};

export default Navbar;
