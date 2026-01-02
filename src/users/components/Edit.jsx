
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaX, FaPen } from 'react-icons/fa6'
import serverURL from '../../services/serverURL'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { editUserApi } from '../../services/allAPI'


function Edit() {
  const [offcanvasStatus, setOffcanvasStatus] = useState(false)
  const [userDetails, setUserDetails] = useState({ id: "", username: "", password: "", role: "", bio: "", pictures: "" })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [existingPicture, setExistingPicture] = useState("")
  const [preview, setPreview] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const navigate = useNavigate()

  const checkPasswordMatch = (data) => {
    setConfirmPassword(data)
    userDetails.password == data ? setPasswordMatch(true) : setPasswordMatch(false)
  }

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, id: user._id, username: user.username, role: user.role, bio: user.bio })
      setExistingPicture(user.pictures)
    }
  }, [])

  const handleUpdateProfile = async () => {
    alert("button clicked")
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
    if (!username || !password || !bio || !confirmPassword) {
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


    <div>
      <button onClick={() => setOffcanvasStatus(true)} className="flex items-center text-blue-600 border p-2 rounded hover:text-white">
        Edit <FaEdit className='ms-3' /> </button>
      {/* offcanvas */}
      {
        offcanvasStatus &&
        <div>
          <div className="fixed inset-0 bg-gray-500/75 w-full h-full">
          </div>
          <div className="bg-white h-full w-90 z-52 fixed top-0 left-0">
            {/* header */}
            <div className="bg-black p-3 flex justify-between text-white">
              <h3 className="text-lg">Update Profile</h3>
              <button onClick={() => setOffcanvasStatus(false)}><FaX /></button>
            </div>
            {/* body */}
            <div className="flex justify-center items-center flex-col mb-5 mt-10">
              {/* image */}
              <label htmlFor="uploadImg" >
                <input onChange={e => handleUploadPicture(e.target.files[0])} type="file" id='uploadImg' hidden />
                {existingPicture ?
                  <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} src={preview ? preview : existingPicture.startsWith("https://lh3.googleusercontent.com/") ? existingPicture : `${serverURL}/uploads/${existingPicture}`} alt="profile" /> :
                  <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} src="https://mockmind-api.uifaces.co/content/human/80.jpg" alt="profile" />
                }

              </label>
              <button style={{ marginTop: '-20px' }} className='bg-dark p-2 text-white rounded'><FaPen /></button>


              {/*name  */}
              <div className="mt-10 mb-3 w-full px-5">
                <input value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='border border-gray-200 p-2 rounded w-full' />

              </div>
              {/* password */}
              <div className="mb-3 w-full px-5">
                <input value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='New Pssword' className='border border-gray-200 p-2 rounded w-full' />
              </div>
              <div className="mb-3 w-full px-5">
                <input value={confirmPassword} onChange={e => checkPasswordMatch(e.target.value)} type="password" placeholder='Confirm Pssword' className='border border-gray-200 p-2 rounded w-full' />
              </div>

              {
                !passwordMatch && <div className="mb-3 w-full text-red-600  px-4 font-bold text-xs ">
                  *Confirm password must be match with new password
                </div>
              }

              {/* bio */}
              <div className="mb-3 w-full px-5">
                <textarea value={userDetails.bio} onChange={e => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder='Bio' rows={3} className='border border-gray-200 p-2 rounded w-full'></textarea>
              </div>
              {/* button */}
              <div onClick={resetForm} className="mb-3 flex justify-end px-5 w-full mt-5 ">
                <button className="px-3 ms-5 py-2 rounded border bg-green-600 text-white hover:bg-yellow-400 hover:border-green-600 hover:text-green-600">
                  RESET</button>
                <button onClick={handleProfileUpdate} disabled={!passwordMatch ? true : false} className="px-3 py-2 rounded border bg-red-600 text-white hover:bg-yellow-400 hover:border-red-600 hover:text-red-600">
                  UPDATE</button>

              </div>
            </div>
          </div>
        </div>
      }
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </div>
  )
}

export default Edit