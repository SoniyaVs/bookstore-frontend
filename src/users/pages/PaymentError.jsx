import React from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'

function PaymentError() {
  return (
   <>
    <Header/>
    <div className='min-h-screen flex justify-center items-center md:px-2 px-5'>
        
        <div className='md:grid grid-cols-2 gap-10 items-center'>
         <div>
            <h1 className='md:text-4xl text-red-600'>Sorry!!Payment Failed !!</h1>
            <h2 className='my-10 md:text-xl'>We apologize for the inconviene caused and appreciate your visit to BookStore...</h2>
            <Link to={'/books'} className='flex items-center p-2 bg-red-500 text-white w-60'><FaBackward className='me-2'/>Explore More..</Link>
         </div>
        </div>
        <div>
            <img src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1" alt="" />
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentError