import axios from 'axios';
import React, { useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export default function Login({ setToken }) {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const onsubmitHandler = async (e) => {
    
    // handle login logic here
    
    try {
      e.preventDefault();
      const res = await axios.post('http://localhost:4000/api/user/admin', { email, password });
      console.log(res);
      console.log(email, password);
      if (res.data.success) {
        setToken(res.data.token);
      }else { 
        toast.error(res.data.message);
      } 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>
        <form onSubmit={onsubmitHandler}>
          <div className="mb-4">
            <p className="mb-1 text-gray-700">Email address</p>
            <input
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="mb-6">
            <p className="mb-1 text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
