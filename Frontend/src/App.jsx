import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navigation from './components/Navbar/Navigation'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Logout from './components/pages/Logout'
import Allusers from './components/admin/Allusers'
import Show from './components/admin/Show'
import Editusers from "./components/admin/Editusers"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <div className='flex h-screen bg-gray-200' >
      <div className='h-full w-60 bg-gray-800 text-white flex flex-col' >
        <Navigation/>
      </div>
      <div className='flex-1 p-8'>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/admin/users' element={<Allusers/>}></Route>
          <Route path='/admin/users/:id' element={<Show/>}></Route>
          <Route path='/admin/users/:id/edit' element={<Editusers/>}></Route>
        </Routes>
      </div>
    </div>     
    </BrowserRouter>
    </>
    
  )
}

export default App