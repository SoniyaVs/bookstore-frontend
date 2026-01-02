import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaCircleCheck } from 'react-icons/fa6'
import Edit from '../components/Edit'
import Purchase from '../components/Purchase'
import SellBook from '../components/SellBook'
import BookStatus from '../components/BookStatus'
import serverURL from '../../services/serverURL'

function Profile() {
  const [tab, setTab] = useState(1)
  const [dp, setDp] = useState("")
  const [username, setUsername] = useState("")

  console.log(dp);
  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      console.log(user);
      
      setDp(user?.pictures)
      console.log(dp);
      
      setUsername(user?.username)
    }
  }, [])

  return (
    <>
      <Header />
      {/* back div */}
      <div style={{ height: '200px' }} className="bg-black">

      </div>
      {/* profile image */}
      <div style={{ height: '230px', width: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white p-3'>
        <img style={{ height: '230px', width: '230px', borderRadius: '50%' }} src={dp?dp.startsWith("https://lh3.googleusercontent.com/")?dp:`${serverURL}/uploads/${dp}`:"https://static.vecteezy.com/system/resources/thumbnails/046/320/111/small/young-businessman-with-notebook-and-pen-on-transparent-background-png.png"} alt="book" />

      </div>
      {/* name with edit block  */}
      <div className='md:flex justify-between items-center px-20 my-5'>
        <h1 className='text-2xl font-bold flex items-center'>{username}<FaCircleCheck className='text-blue-400 ms-5' /></h1>
        <Edit />
      </div>
      <p className='text-justify md:px-20 px-5 my-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur neque modi ad voluptatum quisquam, maiores consequuntur at quis alias, qui reprehenderit. Placeat cupiditate cum quasi ullam? Esse, aliquam velit. Eos?</p>
      {/* tabs with contents */}
      <div className="md:px-40">
        <div className="flex justify-center items-center my-8 font-medium text-lg ">
          <p onClick={() => setTab(1)} className={tab == 1 ? 'text-blue-400 border-gray-200 border-t border-l border-r p-5 cursor-pointer' : 'border-gray-200 border-b  p-4 cursor-pointer'}>Sell Books</p>
          <p onClick={() => setTab(2)} className={tab == 2 ? 'text-blue-400 border-gray-200 border-t border-l border-r p-5 cursor-pointer' : 'border-gray-200 border-b  p-4 cursor-pointer'}> Book Status</p>
          <p onClick={() => setTab(3)} className={tab == 3 ? 'text-blue-400 border-gray-200 border-t border-l border-r p-5 cursor-pointer' : 'border-gray-200 border-b  p-4 cursor-pointer'}> Purchase History</p>

        </div>
        {/* content */}
        {tab == 1 && <SellBook />}
        {tab == 2 && <BookStatus />}
        {tab == 3 && <Purchase />}
      </div>
      <Footer />
    </>
  )
}

export default Profile