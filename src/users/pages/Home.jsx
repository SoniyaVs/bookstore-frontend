import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getHomePageBooksApi } from '../../services/allAPI'
import { searchContext } from '../../contextApi/ShareContext'
function Home() {
  // const [searchKey, setSearchKey] = useState("")
  const { searchKey, setSearchKey } = useContext(searchContext)
  const navigate = useNavigate()
  const [homeBooks, setHomeBooks] = useState([])

  const handleSearch = () => {
    if (!searchKey) {
      toast.warning("Please provide A Book title here !!!")
    } else if (sessionStorage.getItem('token')) {
      toast.warning("Please Login to Search Book")
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    } else if (sessionStorage.getItem('token') && searchKey) {
      navigate('/books')
    } else {
      toast.error("Something went to wrong")
    }
  }
  console.log(homeBooks);

  useEffect(() => {
    getHomeBooks()
  }, [])

  const getHomeBooks = async () => {
    const result = await getHomePageBooksApi()
    if (result.status == 200) {
      setHomeBooks(result.data)
    } else {
      console.log(homeBooks);

    }
  }

  return (
    <div>
      <Header />
      <div>
        {/* landing */}
        <div style={{ height: '500px' }} className='flex justify-center items-center  flex-col bg-[url(/bg-image.jpg)] bg-cover bg-top text-white'>
          <div style={{ height: '500px', backgroundColor: 'rgba(0,0,0,0.4)' }} className='w-full flex justify-center items-center flex-col '>
            <h1 className='text-5xl font-bold mb-2'> Wonderful Gifts</h1>
            <p>Gift your family and friends a book</p>
            {/* search */}
            <div className="mt-9 flex items-center">
              <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} className='bg-white rounded-3xl text-black w-100 placeholder-gray-500 p-2' placeholder='Search Books Here' />
              <button className='text-gray-500' style={{ marginLeft: '-40px' }}><FaSearch /></button>
            </div>
          </div>
        </div>


        {/* new arrival */}

        <section className='md:px-40 p-5 my-5 flex flex-col justify-center items-center '>
          <h1 className='text-3xl font-bold'>NEW ARRIVALS</h1>
          <h1 className='text-2xl '>Explore Our Latest Collection</h1>
          {/* book row & col */}

          <div className='md:grid grid-cols-4 w-full mt-10'>
            {/* duplicated card div */}
            {
              homeBooks?.length > 0 ?
                homeBooks?.map(book => (
                  <div key={book?._id} className="shadow mx-3 rounded p-3 mt-5 md:mt-0">
                    <img width={'300px'} height={'300px'} src={book?.imgUrl} alt="book" />

                    <div className="flex justify-center items-center flex-col mt-4">
                      <h3 className='text-blue-600 font-bold text-lg '>{book?.author}</h3>
                      <h4 className='taxt-lg'>{book?.title}</h4>
                      <h4>$ {book?.discountPrice}</h4>
                    </div>
                  </div>
                ))
                :
                <p className='font-bold'>Loading..</p>
            }
            {/* duplicated card div */}
            {/* <div className="shadow mx-3 rounded p-3">
              <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

              <div className="flex justify-center items-center flex-col mt-4">
                <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                <h4 className='taxt-lg'>Title</h4>
                <h4>$ Price</h4>
              </div>
            </div> */}
            {/* duplicated card div */}
            {/* <div className="shadow mx-3 rounded p-3">
              <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

              <div className="flex justify-center items-center flex-col mt-4">
                <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                <h4 className='taxt-lg'>Title</h4>
                <h4>$ Price</h4>
              </div>
            </div> */}
            {/* duplicated card div */}
            {/* <div className="shadow mx-3 rounded p-3">
              <img width={'300px'} height={'300px'} src="https://img.buzzfeed.com/buzzfeed-static/static/2022-10/12/11/asset/21965ffe2e3e/sub-buzz-2769-1665575410-17.jpg?downsize=900:*&output-format=auto&output-quality=auto" alt="book" />

              <div className="flex justify-center items-center flex-col mt-4">
                <h3 className='text-blue-600 font-bold text-lg '>Author</h3>
                <h4 className='taxt-lg'>Title</h4>
                <h4>$ Price</h4>
              </div>
            </div> */}
          </div>
          {/* all books link */}
          <div className='text-center mt-20'>
            <Link to={'/books'} className='bg-black text- p-3 text-white'>Explore more..</Link>
          </div>
        </section>
        {/* author */}
        <section className='md:px-40 p-5 my-5 md:grid grid-cols-2 items-center gap-20'>
          {/* author content */}
          <div className="text-center">
            <h1 className='text-2xl font-bold'>FEATURED AUTHORS</h1>
            <h2 className='text-xl'>Captivates with every word</h2>
            <p className='text-justify mt-9'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque illo quibusdam tempora incidunt ducimus aliquid, error, vitae facilis nulla quos illum dolore pariatur animi aperiam alias dolores, aliquam amet iusto.</p>

            <p className='text-justify mt-9'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque illo quibusdam tempora incidunt ducimus aliquid, error, vitae facilis nulla quos illum dolore pariatur animi aperiam alias dolores, aliquam amet iusto.</p>
          </div>
          {/* author image */}
          <div className='p-5 flex justify-center items-center'>
            <img className='w-full' src="https://media.istockphoto.com/id/1478316046/photo/portrait-of-high-school-teacher-at-school-library.jpg?s=612x612&w=0&k=20&c=sSU4PQgVZXW6jiddn8YcB3s2F_Vge5RekkWBlMiUKuU=" alt="" />
          </div>
        </section>
        {/* testymony */}
        <section className='md:px-40 p-5 my-5 flex flex-col justify-center items-center '>
          <h1 className='text-3xl font-bold'>TESTIMONIALS</h1>
          <h1 className='text-2xl '>See what others are saying</h1>
          <div className="flex justify-center items-center flex-col my-5">
            <img style={{ borderRadius: '50%' }} width={'200px'} height={'200px'} src="https://static.vecteezy.com/system/resources/thumbnails/046/320/111/small/young-businessman-with-notebook-and-pen-on-transparent-background-png.png" alt="" />
            <p className='mt-5'>Lucas Alexandr</p>
            <p className='text-jsutify mt-5'><span className='font-bold me-2'>Love books, libraries, and the idea of bookstores as magical places.</span>Enjoy light romances + gentle mysteries + old-school literary atmosphere.

              Prefer character- and mood-driven stories rather than heavy plot twists.

              Want a short, easy-going read — maybe nostalgic, peaceful, comforting. </p>
          </div>

        </section>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </div>
  )
}

export default Home