import React, { useState } from 'react'
import { useAuth } from '../store/auth'

const Home = () => {
  const {user} = useAuth();

  return (
    <div>
      {/* <h1> {user.name} </h1> */}
    </div>
  )
}

export default Home