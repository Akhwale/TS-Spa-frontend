import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';


export default function Footer() {
    return (
        <div className="bg-gray-900 text-white py-12 px-6" id="footer">
            <div className="max-w-screen-lg mx-auto text-center">
                {/* Holla at us */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-300">Find us on:</h2>
                <div className="flex justify-center gap-8 mb-6">
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={30} />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} />
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={30} />
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30} />
                    </a>
                </div>

                {/* About Section */}
                <p className="text-sm text-gray-400 mb-4">
                    Welcome to **TS Spa & Grooming Lounge**, where style meets relaxation and beauty is our passion. Your transformation begins here.
                </p>

                {/* Contact Section */}
                <p className="text-sm text-gray-400 mb-4">
                    Book your appointment or inquire about our services: <br />
                    <a href="mailto:info@projectspa.com" className="text-blue-400 hover:underline">
                        info@ts-spa.com
                    </a>
                </p>

                {/* Footer Tagline */}
                <p className="text-sm text-gray-400 mb-4 italic">
                    "Step into luxury, leave feeling fabulous. Relax, refresh, and rejuvenate at TS Spa & Grooming Lounge."
                </p>

                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} TS Spa & Grooming Lounge. All rights reserved.
                </p>
            </div>
        </div>
    );
}
