import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

   // src/components/Footer.jsx


const Footer = () => {
  return (
    <footer className="bg-[#0f1424] text-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12 md:flex md:justify-between md:space-x-6">
        {/* About Us */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold text-white mb-4">ABOUT US</h2>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            dolorum laudantium earum fugit fugiat, eius voluptas aperiam
            numquam, quos, ratione non laborum sed facere ab nesciunt enim, quo
            necessitatibus vero!
          </p>
        </div>

        {/* Newsletter */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold text-white mb-4">NEWS LETTER</h2>
          <p className="text-sm mb-4">Stay updated with our latest trends</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full px-4 py-2 rounded-l-md bg-sky-50 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-r-md hover:bg-yellow-600"
            >
              ➜
            </button>
          </form>
        </div>

        {/* Follow Us */}
        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold text-white mb-4">FOLLOW US</h2>
          <p className="text-sm mb-4">Let us be social</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <FaInstagram className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaFacebook className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar / copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex  flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-2 md:mb-0">
            © 2023 All rights reserved | This website is made with ♥ By Luminar
            Technolab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer