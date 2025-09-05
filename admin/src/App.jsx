import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = "http://localhost:4000/api"

export default function App() {

  const [token, setToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken') : '');

  useEffect(() => {
    localStorage.setItem('adminToken', token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {token === '' ? <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} />
          <hr className='border-gray-300' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ProductList token={token} />} />
                <Route path="/oders" element={<Orders token={token} />} />
              </Routes>

            </div>
          </div>
        </>
      }
    </div>
  )
}
