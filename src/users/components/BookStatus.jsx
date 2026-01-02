import React, { useEffect, useState } from 'react'
import { deleteBookAPI, getAllUserUploadedBooksPageApi } from '../../services/allAPI'

function BookStatus() {
  const [allUserBooks, setAllUserBooks] = useState([])
  console.log(allUserBooks);

  useEffect(() => {
    getUserUploadBooks()
  }, [])

  const getUserUploadBooks = async () => {
    const userToken = sessionStorage.getItem("token")
    if (userToken) {
      const reqHeader = {
        "Authorization": `Bearer ${userToken}`

      }
      const result = await getAllUserUploadedBooksPageApi(reqHeader)
      if (result.status == 200) {
        setAllUserBooks(result.data)
      } else {
        console.log(result);

      }
    }
  }
  
  const removeBook=async(id)=>{
      const userToken = sessionStorage.getItem("token")
    if (userToken) {
      const reqHeader = {
        "Authorization": `Bearer ${userToken}`

      }
      const result = await deleteBookAPI(id,reqHeader)
      if (result.status == 200) {
        getUserUploadBooks()
      } else {
        console.log(result);

      }
    }
  }
  return (
    <div className='p-10 my-20 mx-5 shadow rounded '>
      {/* book div */}
      <div className="bg-gray-200 p-5 rounded  " >

        {
          allUserBooks?.length > 0 ?
            allUserBooks?.map(book => (
              <div key={book?._id} className="md:grid grid-cols-[3fr_1fr] ">
                <div>
                  <h2 className='text-2xl'>{book?.title}</h2>
                  <h3 className='text-xl text-'>{book?.author}</h3>
                  <h4 className='text-lg'>$ {book?.price}</h4>
                  <p className='flex mt-5'>{book?.abstract}</p>
                  <div className="flex mt-5">

                    {
                      book?.status == "pending" ?
                        <img width={'120px'} src="https://www.shutterstock.com/image-vector/grunge-red-pending-word-round-260nw-2467702957.jpg" alt="book" />
                        : book?.status == "approved" ?
                          <img width={'100px'} src="https://www.shutterstock.com/image-vector/green-approved-isolated-round-stamp-600nw-2609271775.jpg" alt="book" />
                          :
                          <img width={'90px'} src="https://i.pinimg.com/736x/d3/62/26/d36226342c122410851a9e77f2fbd33f.jpg" alt="book" />

                    }

                    {/* pending */}

                    {/* approved */}

                    {/* sold */}



                  </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-50' src={book?.imgUrl} alt="book" />
                  <div className='flex justify-end'><button onClick={()=>{removeBook(book?._id)}} className='p-2 bg-red-600 text-white mt-5'>DELETE</button></div>
                </div>
              </div>
            ))
            :
            <div className='text-center my-5 font-bold'>No Books Uploaded yet..</div>
        }
      </div>
    </div>
  )
}

export default BookStatus