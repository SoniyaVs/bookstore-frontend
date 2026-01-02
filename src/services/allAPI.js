import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


export const registerAPI = async (userDetails) => {
    return await commonAPI("POST", `${serverURL}/register`, userDetails)
}

export const loginAPI = async (userDetails) => {
    return await commonAPI("POST", `${serverURL}/login`, userDetails)
}

export const googleLoginAPI = async (userDetails) => {
    return await commonAPI("POST", `${serverURL}/google/sign-in`, userDetails)
}

// /user/book/add addBookApi sellbook component when add book btn click

export const addBookApi = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/user/book/add`, reqBody, reqHeader)
}

///books/home home page api:called by home component when page loads
export const getHomePageBooksApi = async () => {
    return await commonAPI("GET", `${serverURL}/books/home`, {})
}


// /books/all bookpage api:called by books component when page loads- authorized user

export const getAllBooksPageApi = async (reqHeader, searchKey) => {
    return await commonAPI("GET", `${serverURL}/books/all?search=${searchKey}`, {}, reqHeader)
}

// /user-books/all bookpage api:called by books status component when page loads- authorized user

export const getAllUserUploadedBooksPageApi = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/user-books/all`, {}, reqHeader)
}

// /user-books/bought
export const getAllUserBoughtBooksPageApi = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/user-books/bought`, {}, reqHeader)
}

// /books/:id/view
export const viewBookApi = async (reqHeader, id) => {
    return await commonAPI("GET", `${serverURL}/books/${id}/view`, {}, reqHeader)
}

export const editUserApi = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/user/${id}/edit`, reqBody, reqHeader)
}

// /admin-books/all bookpage api:called by Admin resources component when page loads- authorized user

export const getAllAdminBooksPageApi = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/admin-books/all`, {}, reqHeader)
}

// /getallusers  api:called by Admin collection component when tab 2 is open

export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/users/all`, {}, reqHeader)
}
//put req by admin collection when approve btn clicked
export const updateBookStatusAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/books/${id}/update`, {}, reqHeader)
}

// /books/:id delete request by bookstatus component when delete btn clicked
export const deleteBookAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/books/${id}`, {}, reqHeader)
}

// books/id/buy:put req by view component buy btn clicked
export const purchaseBookAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/books/${id}/buy`, {}, reqHeader)
}