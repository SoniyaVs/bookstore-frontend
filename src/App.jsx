import { useContext, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Books from './users/pages/Books'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import View from './users/pages/View'

import AdminHome from './admin/pages/AdminHome'
import AdminCollection from './admin/pages/AdminCollection'
import AdminProfile from './admin/pages/AdminProfile'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import Pnf from './pages/Pnf'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'
import { routeGuardContext } from './contextApi/GuardContext'

function App() {
  const [loading, setLoading] = useState(true)
  const { role, setAuthorised } = useContext(routeGuardContext)

  setTimeout(() => {
    setLoading(false);
  }, 7500);

  console.log('loading:', loading);
  return (
    <>
      <Routes>
        <Route path='/' element={loading ? <Preloader /> : <Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/books' element={<Books />} />

        {role == 'User' && <>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/payment-success' element={<PaymentSuccess />} />
          <Route path='/user/payment-error' element={<PaymentError />} />
          <Route path='/books/:id/view' element={<View />} />
        </>}
        {role == 'admin' && <>

          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/resources' element={<AdminCollection />} />
          <Route path='/admin/profile' element={<AdminProfile />} />
        </>}

        <Route path='/*' element={<Pnf />} />



      </Routes>
    </>
  )
}

export default App
