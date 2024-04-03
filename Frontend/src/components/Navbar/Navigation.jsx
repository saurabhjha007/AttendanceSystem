import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from '../store/auth'

const Navigation = () => {
  const { isLoggedIn }=useAuth()
  
  return (
      <div>
          <div className='flex items-center justify-center h-16 border-b border-gray-700'>
            Attendece system
          </div>
          <nav className='flex-1'>
            <ul className='space-y-4 mt-4' >
              <li><NavLink to="/" className={({isActive})=> isActive ? "px-4 py-2 text-lg  bg-blue-500 hover:bg-blue-600 font-bold":"px-4 py-2 hover:bg-gray-700 text-lg"}>Home</NavLink></li>
              {isLoggedIn ? <li><NavLink to="/logout" className={"px-4 py-2 hover:bg-gray-700 text-lg"}>Logout</NavLink></li> : 
              <>
              <li><NavLink to="/login"  className={({isActive})=> isActive ? "px-4 py-2 text-lg bg-blue-500 hover:bg-blue-600 font-bold":"px-4 py-2 hover:bg-gray-700 text-lg"}>Login</NavLink></li>
              <li><NavLink to="/register" className={({isActive})=> isActive ? "px-4 py-2 text-lg bg-blue-500 hover:bg-blue-600 font-bold":"px-4 py-2 hover:bg-gray-700 text-lg"}>Register</NavLink></li>
              
              </> }

              <li><NavLink to="/admin/users" className={({isActive})=> isActive ? "px-4 py-2 text-lg  bg-blue-500 hover:bg-blue-600 font-bold":"px-4 py-2 hover:bg-gray-700 text-lg"}>Users</NavLink></li>
              
            </ul>  
          </nav>
      </div>    

    
  )
}

export default Navigation

//  w-full