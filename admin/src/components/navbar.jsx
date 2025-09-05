import React from 'react'
import { assets} from '../assets/assets'

export default function Navbar({setToken}) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-content-between">
      <img src={assets.logo} alt="Logo" className="w-[max(10%,80px)]" />
      <button
      onClick={() => setToken("")}
      className="ml-auto bg-gray-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  )
}
