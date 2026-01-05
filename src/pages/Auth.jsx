import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allAPI';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { routeGuardContext } from '../contextApi/GuardContext';

function Auth({ insideRegister }) {
  const [viewPassword, setViewPassword] = useState(false)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: '', email: '', password: ''
  })
  const { role, setAuthorised } = useContext(routeGuardContext)
  console.log(userDetails);

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, password, email } = userDetails
    if (email && username && password) {
      // toast.success("API CALL")
      try {
        const result = await registerAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Register successfully ..Please Login to Bookstore!!!`)
          setUserDetails({ username: "", email: "", password: "" })
          navigate('/login')
        } else if (result.status == 409) {
          toast.warning(result.response.data)
          setUserDetails({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          console.log(result);
          toast.error(`Something went to wrong`)
          // setUserDetails({ username: "", email: "", password: "" })
        }

      } catch (error) {
        console.log(error);

      }
    } else {
      toast.info("Please fill the form completely")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userDetails
    if (email && password) {
      // toast.success("API CALL")
      try {
        const result = await loginAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
          toast.success("Login Successfull...!!!")
          sessionStorage.setItem("token", result.data.token)
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          setAuthorised(true)
          setTimeout(() => {
            if (result.data.user.role == "admin") {
              navigate('/admin/home')
            } else {
              navigate('/')
            }
          }, 2500)
        } else if (result.status == 401 || result.status == 404) {
          toast.warning(result.response.data)
          setUserDetails({ username: '', email: '', password: '' })
        } else {
          toast.warning("Something Went to Wrong !!!")
          setUserDetails({ username: '', email: '', password: '' })
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Please fill the form completely")
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {

    console.log(" inside handle GoogleLogin");
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential)
    console.log(decode);
    const result = await googleLoginAPI({ username: decode.name, email: decode.email, password: 'googlePassword', pictures: decode.picture })
    if (result.status == 200) {
      toast.success("Login Successfull...!!!")
      sessionStorage.setItem("token", result.data.token)
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      setAuthorised(true)
      setTimeout(() => {
        if (result.data.user.role == "admin") {
          navigate('/admin/home')
        } else {
          navigate('/')
        }
      }, 2500)
    } else {
      console.log(result);
      toast.warning("Something Went to Wrong !!!")

    }


  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center  flex-col bg-[url(/background-image-auth.jpg)] bg-cover bg-center '>
      <div className='p-10'>
        <h1 className='text-3xl font-bold text-white text-center'>BOOK STORE</h1>
        <div style={{ width: '400px' }} className='p-5 bg-black text-white justify-center items-center my-5 flex flex-col'>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='border mb-5 flex justify-center items-center'>
            <FaUser className='text-3xl text-white' />
          </div>
          <h2 className='text-2xl'>{insideRegister ? "Register" : "Login"}</h2>
          <form className='my-5 w-full'>
            {/* username */}
            {
              insideRegister &&
              <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded  my-2' />

            }
            {/* email */}
            <input type="text" value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} placeholder='Email ID' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded  my-2' />
            <div className='flex items-center'>
              {/* password */}
              <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={viewPassword ? "text" : "password"} placeholder='Password' className='bg-white text-black placeholder-gray-400 w-full p-2 rounded  my-2' />
              {
                viewPassword ?
                  <FaEyeSlash onClick={() => setViewPassword(!viewPassword)} className='text-gray-400 cursor-pointer' style={{ marginLeft: '-30px', marginTop: '-20px' }} /> :
                  <FaEye onClick={() => setViewPassword(!viewPassword)} className='text-gray-400 cursor-pointer' style={{ marginLeft: '-30px', marginTop: '-20px' }} />
              }

            </div>
            {/* forgot */}
            {
              !insideRegister &&
              <div className='flex justify-between mb-5 '>
                <p className='text-xs text-orange-300'>Never share your resume with others</p>
                <button className='text-us underline'>Forgot Password</button>
              </div>

            }
            {/* login/register btn */}
            <div className="text-center">
              {
                insideRegister ?
                  <button type='button' onClick={handleRegister} className='bg-green-700 p-2 w-full rounded'>Register </button> :
                  <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>

              }
            </div>
            {/* ggogle auth */}
            <div className="text-center my-5">
              {
                !insideRegister && <p>------------------or-------------------</p>
              }
              {
                !insideRegister && <div className='my-4 flex justify-center items-center w-full'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      handleGoogleLogin(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              }
            </div>
            <div className="my-5 text-center">
              {
                insideRegister ?
                  <p className="text-blue-600">Already a user ? <Link to={'login'} className='underline ms-5'>Login</Link></p> :
                  <p className="text-blue-600">Are you  a new user ? <Link to={'/register'} className='underline ms-5'>Register</Link></p>
              }
            </div>
          </form>
        </div>

      </div>

      {/* toaster */}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </div>
  )
}

export default Auth