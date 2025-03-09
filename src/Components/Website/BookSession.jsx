import "../../App.css";

export default function BookSession() {
    return (
        <div className="bg-red-100" id="booksession">
            <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center default">
                {/* Left Content */}
                <div className="w-full md:w-1/2 bg-red-100 p-0 lg:p-8 space-y-3 md:space-y-8">
                    <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold text-gray-800 my-6 leading-tight">
                        Your Moment of Bliss Awaits
                    </h1>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        We value your time as much as you do. In just 10 seconds, you can reserve your spot for the ultimate relaxation experience. No hassle, no delays—just pure indulgence made easy.
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Don’t Wait. Refresh Today.</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Click the button, and wait for the magic unfold in your next visit. Your perfect escape immediately when you want it.
                    </p>

                    <div className="pt-5 ">
                        <a href="/book-appointment" className="shadow-lg border px-10 py-3 rounded border-orange-400 bg-orange-300 hover:bg-orange-400 text-gray-800 hover:text-white font-bold">
                            Book an Appointment
                        </a>
                    </div>
                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-2">
                    <div className="aspect-square overflow-hidden shadow-lg">
                        <img src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_11_yadhsm.jpg' alt="Slide 11" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square overflow-hidden shadow-lg">
                        <img src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_13_dnveyd.jpg' alt="Slide 13" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square overflow-hidden shadow-lg">
                        <img src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_12_gihq6j.jpg' alt="Slide 12" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square overflow-hidden shadow-lg">
                        <img src='https://res.cloudinary.com/dr9a3cu3y/image/upload/c_scale,w_1200/f_auto/q_auto:best/TS%20Spa/img_8_z5dr5p.png' alt="Slide 8" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
