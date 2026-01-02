import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import serverURL from '../../services/serverURL'
import { editUserApi } from '../../services/allAPI'
import { ToastContainer, toast } from 'react-toastify'


function AdminProfile() {
  const [userDetails, setUserDetails] = useState({ id: "", username: "", password: "", role: "", bio: "", pictures: "" })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [existingPicture, setExistingPicture] = useState("")
  const [preview, setPreview] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, id: user._id, username: user.username, role: user.role, bio: user.bio })
      setExistingPicture(user.pictures)
    }
  }, [])

  const checkPasswordMatch = (data) => {
    setConfirmPassword(data)
    userDetails.password == data ? setPasswordMatch(true) : setPasswordMatch(false)
  }

  const handleUploadPicture = async (imgFile) => {
    setUserDetails({ ...userDetails, pictures: imgFile })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)

  }

  const resetForm = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({ ...userDetails, id: user._id, username: user.username, role: user.role, bio: user.bio, password: "" })
    setExistingPicture(user.pictures)
    setPreview("")
    setConfirmPassword("")
    setPasswordMatch(true)
  }

  const handleProfileUpdate = async () => {
    const { username, password, bio, role, id, pictures } = userDetails
    if (!username || !password || !confirmPassword) {
      toast.info("Please fill the form completely!!")
    } else {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const reqBody = new FormData()
        for (let key in userDetails) {
          if (key != "pictures") {
            reqBody.append(key, userDetails[key])
          } else {
            preview ? reqBody.append("pictures", userDetails.pictures) : reqBody.append("pictures", existingPicture)
          }
        }
        const result = await editUserApi(id, reqBody, reqHeader)
        if (result.status == 200) {
          toast.success("Profile Updated SuccessFully...Please Login with new Password..")
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        } else {
          console.log(result);
          toast.error("Something went wrong..!!")

        }
      }
    }
  }
  return (
    < >
      <AdminHeader />
      <div className='md:grid grid-cols-5'>
        <div className='col-span-1'>
          <AdminSideBar />
        </div>
        <div className='col-span-4  p-10'>
          <h1 className='text-center my-5 text-3xl'>Settings</h1>
          <div className="md:grid grid-cols-2 items-center mt-10 gap-10">
            {/* text */}
            <div>
              <h2 className="text-2xl font-bold">Welcome to the Admin Settings Panel!</h2>
              <p className='text-justify mb-5'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsa suscipit alias aliquam ipsum dicta, eum sapiente distinctio, ipsam corrupti deserunt ullam dignissimos veniam pariatur, nesciunt voluptatum impedit necessitatibus tempora?
              </p>
              <p className='font-bold'> quo! A explicabo amet autem dignissimos pariatur</p> cumque
              <p>
                beatae voluptatibus eligendi repellendus architecto dicta temporibus deleniti, facilis voluptatem ducimus. Soluta alias amet repudiandae obcaecati, facilis ab?
                Ipsum placeat quidem tenetur laborum consectetur incidunt explicabo deleniti eveniet hic? Consequatur, iusto? Illum accusamus debitis eos impedit numquam placeat eius tempore sapiente aut quibusdam eveniet, minus, quidem cupiditate nulla!
              </p>
            </div>
            {/*  */}
            <div className="flex justify-content items-center flex-col rounded bg-blue-100 p-5">
              {/* image */}
              <label htmlFor="uploadImg" >
                <input onChange={e => handleUploadPicture(e.target.files[0])} type="file" id='uploadImg' hidden />
                {
                existingPicture ?
                  <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} src={preview ? preview : existingPicture.startsWith("https://lh3.googleusercontent.com/") ? existingPicture : `${serverURL}/uploads/${existingPicture}`} alt="profile" /> :
                  <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} src="https://mockmind-api.uifaces.co/content/human/80.jpg" alt="profile" />
                }

              </label>
              <button style={{ marginTop: '-20px' }} className='bg-yellow-200 p-2 text-white rounded'><FaPen /></button>
              {/*name  */}
              <div className="mt-10 mb-3 w-full px-5">
                <input value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='border border-gray-800 p-2 rounded w-full' />

              </div>
              {/* password */}
              <div className="mb-3 w-full px-5">
                <input value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='New Pssword' className='border border-8ray-200 p-2 rounded w-full' />
              </div>
              <div className="mb-3 w-full px-5">
                <input value={confirmPassword} onChange={e => checkPasswordMatch(e.target.value)} type="password" placeholder='Confirm Pssword' className='border border-gray-800 p-2 rounded w-full' />
              </div>

              {
                !passwordMatch && <div className="mb-3 w-full text-red-600  px-4 font-bold text-xs ">
                  *Confirm password must be match with new password
                </div>
              }

              {/* button */}
              <div className='mb-3 px-5 w-full flex justify-center mt-1'>
                <button onClick={resetForm} className='px-3 py-2 rounded bg-green-600 text-white hover:bg-white hover:border-red-600 hover:text-red-600'>RESET</button>
                <button onClick={handleProfileUpdate} disabled={!passwordMatch ? true : false} className='px-3 py-2 rounded bg-green-600 text-white hover:bg-white hover:border-green-600 hover:text-green-600 ms-5'>UPDATE</button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </>
  )
}

export default AdminProfile