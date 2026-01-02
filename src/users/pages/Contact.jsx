// Contact.jsx (or .tsx)
import React from 'react';

export default function Contact() {
  return (
    <section className="py-4 bg-gray-50 p-5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-1">Contacts</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione, officia delectus consequuntur, dicta
            libero magni omnis architecto voluptas culpa praesentium ipsum assumenda quae dolor, nihil rerum fugit
            expedita corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maiores fuga, modi vel
            accusantium magnam ex, ratione aliquam eius odict consequuntur earum, itaque nulla labore veritatis quis
            aut atque!
          </p>
        </div>

        {/* Info icons row */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-6 sm:space-y-0 mb-8">
          {/* Address */}
          <div className="flex items-center text-gray-700">
            <div className="p-3 bg-white rounded-full shadow-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span>123 Main Street, Apt 4B, Anytown, CA 91234</span>
          </div>

          {/* Phone */}
          <div className="flex items-center text-gray-700">
            <div className="p-3 bg-white rounded-full shadow-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.66l1.528 4.586a1 1 0 01-.217 1.09L9.5 11.5a11.042 11.042 0 005 5l1.254-1.032a1 1 0 011.09-.217l4.586 1.528a1 1 0 01.66.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <span>+91 9874561230</span>
          </div>

          {/* Email */}
          <div className="flex items-center text-gray-700">
            <div className="p-3 bg-white rounded-full shadow-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 12H8m8 0a4 4 0 100-8 4 4 0 000 8zm0 0v6m0 0h-8m8 0a4 4 0 01-4 4H8a4 4 0 01-4-4V6a4 4 0 014-4h4"/>
              </svg>
            </div>
            <span>bookstore@gmail.com</span>
          </div>
        </div>

        {/* Main split: form + map */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-12 lg:space-y-0">
          {/* Form */}
          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Send me Message</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
              >
                Send ✈️
              </button>
            </form>
          </div>

          {/* Map / placeholder */}
          <div className="lg:w-1/2">
            {/* Replace src below with your map iframe */}
            <div className="w-full h-110 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.179275633065!2d76.26730341533026!3d9.994263892512443!2m3!1f0!2f0!3f0!3m2!
                1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0612a19dc7b14b%3A0xd4c9bd7e6610b0aa!2sKochi%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
