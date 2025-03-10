import Navbar from "./Navbar";

export default function Index(){
    return(
      <div className="landing px-lg-12" id="index" >
        <Navbar />
        <div className=" flex justify-center items-center min-h-[100vh]">
        <div className="text-center">
          
          <div>
          <img className="mx-auto pb-12 w-60" src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/logo.png'/>
            </div>
          <a href="/book-appointment" className="border px-4 lg:px-10 mt-10 py-2 lg:py-3 border-orange-400 bg-orange-300 hover:bg-orange-400 text-gray-800 hover:text-white font-bold shadow-lg rounded">Book an Appointment</a>
          <p className="my-6 text-gray-800 text-white text-sm md:text-lg px-5">Relax, refresh, and redefine your style – schedule your visit today!</p>
          
        </div>
      </div>
      </div> 
    )
}