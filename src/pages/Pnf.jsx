import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Pnf() {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2 py-8">
      {/* Illustration / Image */}
      <div className="w-full max-w-md mb-2">
        <img
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEH0JJNtfot9Ccpxna_46wcj0yumVmv4_1JX_J87n_TqifgQ4y"
          alt="Page not found illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
        Looks Like You're Lost
      </h1>

      {/* Subtitle / message */}
      <p className="text-gray-600 text-center mb-4">
        The page you are looking for is not available
      </p>

      {/* Back home button */}
      <Link
        to="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        BACK HOME
      </Link>
    </div>
  )
}

export default Pnf