// import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets.ts'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {

  const [visibale, setVisible] = useState(false);

  return (
    <div className="navbar flex items-center justify-between py-5 font-medium sticky-top ">
      <img src={assets.logo} className='w-36' alt="" />
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className='flex flex-col items-center gap-1' >
          <p>Home</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to="/collection" className='flex flex-col items-center gap-1' >
          <p>Collection</p>
          <hr className='w-2/3 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

        <div className='group relative'>
          <img src={assets.profile_icon} alt="cart" className='w-5 cursor-pointer' />

          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
            <div className='bg-white shadow-lg rounded-md text-gray-500 flex flex-col w-36 gap-2 py-3 px-4'>
              <p className='cursor-pointer hover:text-black '>My Profile</p>
              <p className='cursor-pointer hover:text-black '>Orders</p>
              <p className='cursor-pointer hover:text-black '>Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className='relative '>
          <img src={assets.cart_icon} alt="cart" className='w-5  min-w-5 cursor-pointer' />
          <p className='absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>5</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* mobile menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white z-50 transition-all ${visibale ? 'w-full' : 'w-0'} `}>
        <div className="flex flex-col text-gray-600 " >
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} to='/' className=' py-2 pl-5 border border-gray-300 hover:text-black' >Home</NavLink>
          
          <NavLink onClick={() => setVisible(false)} to='/collection' className=' py-2 pl-5 border border-gray-300 hover:text-black' >Collection</NavLink>

        </div>
      </div>
    </div>
  )
}
