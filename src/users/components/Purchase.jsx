import React, { useEffect, useState } from 'react'
import { getAllUserBoughtBooksPageApi } from '../../services/allAPI';

function Purchase() {

  const [userBooks, setUserBooks] = useState([])
  console.log(userBooks);

  useEffect(() => {
    getUserBoughtBooks()
  }, [])

  const getUserBoughtBooks = async () => {
    const userToken = sessionStorage.getItem("token")
    if (userToken) {
      const reqHeader = {
        "Authorization": `Bearer ${userToken}`

      }
      const result = await getAllUserBoughtBooksPageApi(reqHeader)
      if (result.status == 200) {
        setUserBooks(result.data)
      } else {
        console.log(result);

      }
    }
  }
  return (
    <div className='p-10 my-20 mx-5 shadow rounded'>
      {/* book div */}
      <div className="bg-gray-200 p-5 rounded" >
        {
          userBooks?.length > 0 ?
            userBooks?.map(book => (
              <div key={book?._id} className="md:grid grid-cols-[3fr_1fr]">
                <div>
                  <h2 className='text-2xl'>{book?.title}</h2>
                  <h3 className='text-xl text-'>{book?.author}</h3>
                  <h4 className='text-lg'>$ {book?.price}</h4>
                  <p className='flex mt-5'>{book?.abstract}</p>
                  <div className="flex mt-5">
                    <img width={'120px'} src="https://c8.alamy.com/comp/2FN7NNJ/purchase-text-written-on-red-grungy-zig-zag-borders-round-stamp-2FN7NNJ.jpg" alt="book" />
                  </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-50' src={book?.imgUrl} alt="book" />
                </div>
              </div>
            ))
            :
            <div className='text-center my-5 font-bold'>No books bought yet..</div>
        }
      </div>
    </div>
  )
}

export default Purchase