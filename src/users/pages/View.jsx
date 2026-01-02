import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaBackward, FaCamera, FaEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { FaX } from 'react-icons/fa6'
import { purchaseBookAPI, viewBookApi } from '../../services/allAPI'
import serverURL from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js';


function View() {
  const [modalStatus, setModalStatus] = useState(false)
  const [book, setBook] = useState({})
  const { id } = useParams()
  console.log(id);
  useEffect(() => {
    getBookDetails()
  }, [])

  const getBookDetails = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await viewBookApi(reqHeader, id)
      if (result.status == 200) {
        setBook(result.data)
      } else {
        console.log(result);
      }
    }
  }

  const makePayment = async () => {
    // to view stripe payment window in browser
    const stripe = await loadStripe('pk_test_51SkJBtK6kSoyGhgraBGyYtw8f4DKopV3qjiPHzF1th7clQ48fMhBS1dWFO2JyNqqCKUHZtnw8w29cywk3VLYXdLR00LnPJ5F6u');
    // api call
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await purchaseBookAPI(id, reqHeader)
      if (result.status == 200) {
        const { checkoutURL } = result.data
        window.location.href = checkoutURL
      } else {
        console.log(result);
      }
    }

  }
  return (
    <>
      <Header />
      <div className='md:m-10 m-5'>
        <div className="shadow border p-5 border-gray-200">
          {/* image */}
          <div className='md:grid grid-cols-4 gap-x-10'>
            {/* image column */}
            <div className='col-span-1'>
              <img width={'300px'} height={'300px'} src={book?.imgUrl} alt="book" />
            </div>
            <div className="col-span-3">
              <div className="flex justify-between mt-5 md:mt-0">
                <h1 className='text-2xl font-black'>Book Title:{book?.title}</h1>
                <button className='text-gray-300'><FaEye onClick={() => setModalStatus(true)} /></button>
              </div>
              <p className='my-3 text-blue-700'>-Author:{book?.author}</p>
              <div className='md:grid grid-cols-3 gap-5 my-10'>
                <p className='font-bold'>Publisher :{book?.publisher}</p>
                <p className='font-bold'>Language :{book?.languages}</p>
                <p className='font-bold'>No.of Pages :{book?.pages}</p>
                <p className='font-bold'>Original Price :{book?.price}</p>
                <p className='font-bold'>ISBN :{book?.isbn}</p>
                <p className='font-bold'>Category :{book?.category}</p>
                <p className='font-bold'>Seller :{book?.sellerMail}</p>
              </div>
              <div className='md:my-10  my-4'>
                <p className='font-bold text-lg'>Abstract:{book?.abstract}</p>
              </div>
              <div className="flex justify-end">
                <Link to={'/books'} className='bg-blue-700 p-2 text-white flex items-center rounded'><FaBackward className='me-2' />Back</Link>
                <button onClick={makePayment} className='bg-green-700 p-2 rounded text-white ms-5'>Buy ${book?.discountPrice}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      {modalStatus &&
        <div className="relative z-10">
          <div className="bg-gray-500/75 fixed inset-0">
            <div className="flex justify-center items-center min-h-screen ">
              <div className="bg-white rounded-2xl md:w-250 w-100">
                {/* book title */}
                <div className="bg-black text-white p-3 flex justify-between items-center ">
                  <h3>Books Images</h3>
                  <FaX onClick={() => setModalStatus(false)} />
                </div>
                {/* modal body */}
                <div className='relative p-5' onClick={() => setModalStatus(false)}>
                  <h1 className='text-blue-600 flex items-center '><FaCamera className='me-2' />Camera  Click of the books in the hand of seller </h1>
                  <div className="md:flex flex-wrap my-4">
                    {book?.uploadImg?.map(fileName => (
                      <img key={fileName} className='md:w-75 w-25 md:me-2 mb-3 md:mb-0' width={'300px'} height={'300px'} src={`${serverURL}/uploads/${fileName}`} alt="book" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
      <Footer />
    </>
  )
}

export default View