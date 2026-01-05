import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routeGuardContext } from '../../contextApi/GuardContext'

function AdminHeader() {
  const { role, setAuthorised } = useContext(routeGuardContext)
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    setAuthorised(false)
    navigate("/login")

  }

  return (
    <>
      {/* header upper part */}
      <div className='flex justify-between -items-center p-3 md:px-20'>
        {/* logo with title */}
        <div className="flex items-center">
          <img width={'70px'} height={'70px'} src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="logo" />
          <p className='font-bold text-2xl'>BOOK STORE</p>
        </div>
        {/* logout */}
        <button onClick={logout} className='bg-black px-3 py-2 rounded text-white flex items-center hover:bg-white hover:text-black'>LOGOUT</button>
      </div>
      {/* header lower part */}
      <div className="bg-black p-2">
        <marquee>
          <p className='text-white'>Welcome ,Admin! You're all set to manage and monitor the system.Let's go to work!</p>

        </marquee>
      </div>
    </>
  )
}

export default AdminHeader