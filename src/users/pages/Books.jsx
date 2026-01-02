import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getAllBooksPageApi } from '../../services/allAPI'
import { searchContext } from '../../contextApi/ShareContext'

function Books() {
  const { searchKey, setSearchKey } = useContext(searchContext)
  const [showCategoryList, setShowCategoryList] = useState(false)
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [tempAllBook, setTempAllBook] = useState()
  console.log(allBooks);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      getAllBooks(userToken)
    }
  }, [searchKey])

  const getAllBooks = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllBooksPageApi(reqHeader, searchKey)
    if (result.status == 200) {
      setAllBooks(result.data)
      setTempAllBook(result.data)
      const tempAllCategory = result.data?.map(item => item.category)
      const tempAllCategoryList = new Set([...tempAllCategory])
      setAllCategory([...tempAllCategoryList])
      // console.log([...tempAllCategoryList]);

    } else {
      console.log(result);

    }
  }

  const filterBook = (category) => {
    if (category == "all") {
      setAllBooks(tempAllBook)
    } else {
      setAllBooks(tempAllBook?.filter(item => item.category == category))
    }
  }

  return (
    <>
      <Header />
      {/* login book page */}
      {token ?
        <>
          {/* title && Book search */}
          <div className="flex flex-col justify-center items-center py-5">
            <h1 className='text-3xl font-bold my-5'>All books</h1>
            <div className="flex my-5">
              <input value={searchKey} onChange={e => setSearchKey(e.target.value)} type="text" className='border border-gray-400 w-100 p-2' placeholder='Search By Item' />
              <button className='bg-black p-2 text-white'>Search</button>
            </div>

          </div>
          <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>
            <div className='cols-span-1'>
              <div className="flex justify-between">
                {/* filter title */}
                <h1 className='text-2xl font-semibold'>Filter</h1>
                <button onClick={() => setShowCategoryList(!showCategoryList)} className='text-2xl md:hidden'><FaBars /></button>
              </div>
              {/* filter option */}
              <div className={showCategoryList ? "block" : "md:block hidden"}>
                {/* category 1 */}
                <div className="mt-3">
                  <input onClick={() => filterBook("all")} type="radio" name='filter' id='all' />
                  <label htmlFor="all" className='ms-3'>All</label>
                </div>
                {/* book category */}
                {
                  allCategory?.map((category, index) => (
                    <div key={index} className="mt-3">

                      <input onClick={() => filterBook(category)} type="radio" name='filter' id={category} />
                      <label htmlFor={category} className='ms-3'>{category}</label>

                    </div>
                  ))
                }
              </div>
            </div>
            {/* book row */}
            <div className="col-span-3">

              <div className="md:grid grid-cols-4 mt-5 md:mt-0">
                {/* book card 1 */}
                {
                  allBooks?.length > 0 ?
                    allBooks?.map(book => (
                      <div key={book?._id} hidden={book?.status!='approved'} className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                        <img width={'300px'} height={'300px'} src={book?.imgUrl} alt="book" />

                        <div className="flex justify-center items-center flex-col mt-4">
                          <h3 className='text-blue-600 font-bold text-lg '>{book?.author}</h3>
                          <h4 className='taxt-lg'>{book?.title.slice(0, 9)}...</h4>
                          <Link to={`/books/${book?._id}/view`} className='bg-black py-2 px-5 mt-2 text-white'>View</Link>
                        </div>
                      </div>
                    ))
                    :
                    <p className='font-bold'>Books Not Found</p>
                }
                {/* book card 2 */}
                {/* <div className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                  <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

                  <div className="flex justify-center items-center flex-col mt-4">
                    <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                    <h4 className='taxt-lg'>Title</h4>
                    <Link to={'/books/:id/view'} className='bg-black py-2 px-5 mt-2 text-white'>View</Link>
                  </div>
                </div> */}
                {/* book card 3 */}
                {/* <div className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                  <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

                  <div className="flex justify-center items-center flex-col mt-4">
                    <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                    <h4 className='taxt-lg'>Title</h4>
                    <Link to={'/books/:id/view'} className='bg-black py-2 px-5 mt-2 text-white'>View</Link>
                  </div>
                </div> */}
                {/* book card 4 */}
                {/* <div className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                  <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

                  <div className="flex justify-center items-center flex-col mt-4">
                    <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                    <h4 className='taxt-lg'>Title</h4>
                    <Link to={'/books/:id/view'} className='bg-black py-2 px-5 mt-2 text-white'>View</Link>
                  </div>
                </div> */}
              </div>

            </div>
          </div>

        </>
        :
        <div className='w-full h-screen flex  justify-center items-center flex-col'>
          <img className='w-50' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="lockscreen" />
          <p className='text-xl font-bold my-20'> Please  <Link className='underline text-blue-500' to={'/login'}>Login</Link>  to Explore more !!!</p>
          {/* not login book page */}
        </div>
      }

      <Footer />
    </>
  )
}

export default Books