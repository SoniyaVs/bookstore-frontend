import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBars, FaFacebook, FaInstagram, FaPowerOff, FaUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import serverURL from '../../services/serverURL';


function Header() {
  const [listStatus, setListStatus] = useState(false);
  const [dp, setDp] = useState("")
  const [token, setToken] = useState("")
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    setToken("")
    setDp("")
    setDropDown(false)
    setListStatus(false)
    navigate('/')

  }

  const menuBtnClick = () => {
    setListStatus(!listStatus)
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {

      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user.pictures)
      console.log(dp);

    } else {

    }
  }, [token])

  return (
    <>
      {/* header upper part title & login */}
      <div className='grid grid-cols-3 p-3'>
        {/* logo with title */}
        <div className="flex items-center">
          <img width={'70px'} height={'70px'} src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="logo" />
          <h1 className='text-2xl font-bold ms-1 md:hidden'>BOOKSTORE</h1>
        </div>

        {/* title */}
        <div className="md:flex justify-end items-center hidden">
          <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
        </div>
        {/* login */}
        <div className="md:flex justify-end items-center hidden">
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
          {!token ? <Link to={'/login'} className='ms-2 border rounded py-1 px-2 hover:bg-black hover:text-white flex items-center'><FaUser className='me-1' />Login</Link> :
            <div className='relative inline-block text-left ms-2'>
              <button onClick={() => setDropDown(!dropDown)} className='w-full bg-white px-3 py-2 shadow hover:bg-gray-50'>
                <img width={'40px'} height={'40px'} style={{ borderRadius: '50%' }} src={dp ? dp.startsWith("https://lh3.googleusercontent.com/") ? dp : `${serverURL}/uploads/${dp}` : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"} alt="" />
              </button>
              {dropDown && <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg origin-top-right ring-1 ring-black/5 focus:outline-hidden">
                <Link to={'/user/profile'} className=' px-4 py-2 text-sm text-gray-700 flex items-center'><FaAddressCard className='me-3' />Profile</Link>
                <button className=' px-4 py-2 text-sm text-gray-700 flex items-center'><FaPowerOff className='me-3' />LogOut</button>
              </div>}
            </div>
          }
        </div>
      </div>
      {/* lower */}
      <nav className="w-full p-2 bg-black text-white md:flex justify-center items-center">
        <div className="flex justify-between items-center text-2xl md:hidden">
          {/* menu bar */}
          <button onClick={menuBtnClick}><FaBars /></button>
          {/* login links */}
          {!token ? <Link to={'/login'} className='ms-2 border rounded py-1 px-2 hover:bg-black hover:text-white flex items-center'><FaUser className='me-1' />Login</Link> :
            <div className='relative inline-block text-left ms-2'>
              <button onClick={() => setDropDown(!dropDown)} className='w-full bg-white px-3 py-2 shadow hover:bg-gray-50'>
                <img width={'40px'} height={'40px'} style={{ borderRadius: '50%' }} src={dp ? dp.startsWith("https://lh3.googleusercontent.com/") ? dp : `${serverURL}/uploads/${dp}` : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"} alt="" />
              </button>
              {dropDown && <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg origin-top-right ring-1 ring-black/5 focus:outline-hidden">
                <Link to={'/user/profile'} className=' px-4 py-2 text-sm text-gray-700 flex items-center'><FaAddressCard className='me-3' />Profile</Link>
                <button onClick={logout} className=' px-4 py-2 text-sm text-gray-700 flex items-center'><FaPowerOff className='me-3' />LogOut</button>
              </div>}
            </div>
          }
        </div>

        <ul className={listStatus ? "flex flex-col" : "md:flex justify-center items-center hidden"}>
          <li className='md:mx-4 mt-3 md:mt-0'><Link to={'/'} >HOME</Link></li>
          <li className='md:mx-4 my-3 md:my-0'><Link to={'/books'} >BOOKS</Link></li>
          <li className='md:mx-4 mb-3 md:mb-0'><Link to={'/contact'}>CONTACT</Link></li>
        </ul>
      </nav>

    </>
  )
}

export default Header