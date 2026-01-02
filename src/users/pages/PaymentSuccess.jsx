import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='min-h-screen flex justify-center items-center'>
        
        <div className='md:grid grid-cols-2 gap-10'>
         <div>
            <h1 className='md:text-4xl text-blue-400'>Congratualation!!</h1>
            <h2 className='my-10'>Thank you for purchasing with BookStore</h2>
            <Link to={'/books'} className='flex items-center p-2 bg-blue-700 text-white w-60'><FaBackward/>Explore More..</Link>
         </div>
        </div>
        <div>
            <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="" />
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess