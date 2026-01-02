import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ShareContext from './contextApi/ShareContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> <GoogleOAuthProvider clientId='595285760854-12ppi6t6cn04e2hsn600sqn03u2qrh0v.apps.googleusercontent.com'><ShareContext><App /></ShareContext></GoogleOAuthProvider></BrowserRouter>
  </StrictMode>,
)
