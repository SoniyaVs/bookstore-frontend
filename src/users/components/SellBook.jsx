import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { addBookApi } from '../../services/allAPI';


function SellBook() {

    const [bookDetails, setBookDetails] = useState({
        title: "", author: "", pages: "", price: "", discountPrice: "", imgUrl: "", languages: "", publisher: "", abstract: "", isbn: "", category: "", uploadImg: []
    })
    console.log(bookDetails);
    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])
    const handleUploadBookImage = (e) => {
        console.log(e.target.files[0]);

        const imgFileArray = bookDetails.uploadImg
        imgFileArray.push(e.target.files[0])
        setBookDetails({ ...bookDetails, uploadImg: imgFileArray })
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)
        const bookImagesArray = previewList
        bookImagesArray.push(url)
        setPreviewList(bookImagesArray)


    }

    const resetUploadBookForm = () => {
        setBookDetails({
            title: "", author: "", pages: "", price: "", discountPrice: "", imgUrl: "", languages: "", publisher: "", abstract: "", isbn: "", category: "", uploadImg: []

        })
        setPreview("")
        setPreviewList([])
    }

    const handleUploadBooks = async () => {
        const { title, author, pages, price, discountPrice, imgUrl, languages, publisher, abstract, isbn, category, uploadImg } = bookDetails
       
        if (!title || !author || !pages || !price || !discountPrice || !imgUrl || !languages || !publisher || !abstract || !isbn || !category || uploadImg.length == 0) {
            toast.warning("Please fill the form completely")
        } else {
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = new FormData()
                for (let key in bookDetails) {
                    if (key != "uploadImg") {
                        reqBody.append(key, bookDetails[key])
                    } else {
                        bookDetails.uploadImg.forEach(imgFile => {
                            reqBody.append("uploadImg", imgFile)
                        })
                    }
                }
                const result = await addBookApi(reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Book Added Successfully...")
                } else if (result.status == 401) {
                    toast.warning(result.response.data)
                } else {
                    toast.error("Something Went To Wrong")
                }
                resetUploadBookForm()
            }
        }

    }
    return (
        <div className='p-10 my-20 mx-5 bg-gray-200'>
            <h1 className='text-center text-3xl font-bold'>Book Details</h1>
            <div className="md:grid grid-cols-2 mt-10 w-full">
                <div className="px-3">
                    <div className="mb-3">
                        <input value={bookDetails.title} onChange={e => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 w-100 bg-white rounded' />
                    </div>
                    <div className='mb-3'>
                        <input value={bookDetails.author} onChange={e => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 w-100 bg-white  rounded' />
                    </div>
                    <div className='mb-3'>
                        <input value={bookDetails.pages} onChange={e => setBookDetails({ ...bookDetails, pages: e.target.value })} type="text" placeholder='No.of Pages ' className='p-2 w-100 bg-white  rounded' />
                    </div>
                    <div className='mb-3'>
                        <input value={bookDetails.price} onChange={e => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Original Price' className='p-2 w-100  bg-white rounded' />
                    </div>
                    <div className='mb-3'>
                        <input value={bookDetails.discountPrice} onChange={e => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='p-2 w-100  bg-white rounded' />
                    </div>

                    <div className='mb-3'>
                        <input value={bookDetails.imgUrl} onChange={e => setBookDetails({ ...bookDetails, imgUrl: e.target.value })} type="text" placeholder='Image Url' className='p-2 w-100  bg-white rounded' />
                    </div>
                    <div className='mb-3'>
                        <textarea value={bookDetails.abstract} onChange={e => setBookDetails({ ...bookDetails, abstract: e.target.value })} rows={5} placeholder='Abstract' className='p-2 w-100  bg-white rounded' />
                    </div>

                </div>

                <div className="px-3">
                    <div className='mb-3'>
                        <input value={bookDetails.languages} onChange={e => setBookDetails({ ...bookDetails, languages: e.target.value })} type="text" placeholder='Language' className='p-2 w-100 bg-white rounded' />
                    </div>
                    <div className='mb-3'>
                        <input value={bookDetails.publisher} onChange={e => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 w-100 bg-white  rounded' />
                    </div>

                    <div className='mb-3'>
                        <input value={bookDetails.isbn} onChange={e => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 w-100 bg-white   rounded' />
                    </div>

                    <div className='mb-3'>
                        <input value={bookDetails.category} onChange={e => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 w-100   bg-white rounded' />
                    </div>

                    <div className='mb-3 flex justify-center items-center mt-10'>
                        <label htmlFor="uploadingImg" >
                            <input onChange={e => handleUploadBookImage(e)} type="file" id='uploadingImg' hidden />
                            <img width={'200px'} src={preview ? preview : "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_1280.png"} alt="" />
                        </label>

                    </div>

                    {/* for more images */}
                    {preview &&
                        <div className='flex justify-center items-center'>
                            {previewList?.map(
                                (bookUrl, index) => (
                                    <img key={index} width={'70px'} height={'70px'} className='mx-3' src={bookUrl} alt="upload img" />
                                )
                            )
                            }
                            {/* add more images */}
                            {previewList.length < 3 && <label htmlFor="bookImage" className='flex items-center'>
                                <input onChange={e => handleUploadBookImage(e)} id='bookImage' type="file" hidden />
                                <FaPlus className='text-3xl ms-3' />
                            </label>}
                        </div>}
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <button onClick={resetUploadBookForm} className='bg-gray-600 text-white p-2 rounded me-5 hover:bg-white  hover:text-gray-400'>RESET</button>
                <button onClick={handleUploadBooks} className='bg-blue-600 text-white p-2 rounded  hover:bg-white  hover:text-gray-400'>SUBMIT</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="colored"
            />
        </div>
    )
}

export default SellBook