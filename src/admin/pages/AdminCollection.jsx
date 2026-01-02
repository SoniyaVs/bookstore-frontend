import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { getAllAdminBooksPageApi, getAllUsersAPI, updateBookStatusAPI } from '../../services/allAPI'
import serverURL from '../../services/serverURL'
import { ToastContainer, toast } from 'react-toastify';


function AdminCollection() {
  const [tab, setTab] = useState(0)
  const [allBooks, setAllBooks] = useState([])
  const [allUsers, setAllUsers] = useState([])
  console.log(allBooks);
  console.log(allUsers);
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      if (tab == 1) {
        getAllBooksDetails(token)
      } else if (tab == 2) {
        getAllUserDetails(token)
      }
    }
  }, [tab])

  const getAllBooksDetails = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllAdminBooksPageApi(reqHeader)
    if (result.status == 200) {
      setAllBooks(result.data)
    } else {
      console.log(result);
    }
  }

  const getAllUserDetails = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUsersAPI(reqHeader)
    if (result.status == 200) {
      setAllUsers(result.data)
    } else {
      console.log(result);
    }
  }

  const updateBookStatus = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await updateBookStatusAPI(id, reqHeader)
      if (result.status == 200) {
        toast.success("Book Status Updated Successfully..!!")
        getAllBooksDetails(token)
      } else {
        console.log(result);

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
          <h1 className='text-center text-3xl my-5 font-bold'>All Collections</h1>
          {/* tab */}
          <div className='flex my-10 justify-center items-center'>
            <p onClick={() => setTab(1)} className={tab == 1 ? 'text-blue-600 font-bold border-l border-t border-r p-3 border-gray-600 text-xl' : 'font-bold border-b p-3 border-gray-600 text-xl'}>Books</p>
            <p onClick={() => setTab(2)} className={tab == 2 ? 'text-blue-600 font-bold border-l border-t border-r p-3 border-gray-600 text-xl' : 'font-bold border-b p-3 border-gray-600 text-xl'}>Users</p>

          </div>

          {/* tab contents */}

          {tab == 1 &&
            <div className='md:grid grid-cols-4 w-full my-5'>
              {
                allBooks?.length > 0 ?
                  allBooks?.map(book => (
                    <div key={book?._id} className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                      <img width={'300px'} height={'300px'} src={book?.imgUrl} alt="book" />

                      <div className="flex justify-center items-center flex-col mt-4">
                        <h3 className='text-blue-600 font-bold text-lg '>{book?.author}</h3>
                        <h4 className='taxt-lg'>{book?.title}</h4>
                        <h4> {book?.discountPrice}</h4>
                        <div className='grid mt-3 w-full text-center'>
                          {book?.status != 'approved' ?
                            <button onClick={()=>updateBookStatus(book?._id)} className='bg-green-600 p-2 text-white'>APPROVE</button>
                            :
                            <img width={'50px'} src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Approved.png" alt="check icon" />
                          }
                        </div>
                      </div>
                    </div>
                  )) :
                  <p>Loading...</p>
              }
            </div>
          }
          {tab == 2 &&
            <div className='md:grid grid-cols-3 w-full my-5'>
              {
                allUsers?.length > 0 ?
                  allUsers?.map(user => (
                    <div className="rounded bg-gray-200 m-2 p-1 text-wrap">
                      <p className='text-red-200 font-bold'>ID:{user?._id}</p>
                      <div className="flex justify-between text-wrap mt-2">
                        {/* image  */}
                        <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src={user?.pictures?
                          user?.pictures.startsWith("https://lh3.googleusercontent.com/") ? user?.pictures : `${serverURL}/uploads/${user.pictures}` : "https://images.ctfassets.net/xjcz23wx147q/iegram9XLv7h3GemB5vUR/0345811de2da23fafc79bd00b8e5f1c6/Max_Rehkopf_200x200.jpeg"} alt="user" />
                        {/*content  */}
                        <div className='ms-5'>
                          <h4 className='font-bold text-2xl text-blue-800'>{user?.username}</h4>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  )) :
                  <p>Loading</p>
              }

            </div>}
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

export default AdminCollection