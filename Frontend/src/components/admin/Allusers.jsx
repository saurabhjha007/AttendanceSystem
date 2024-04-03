import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Allusers = () => {
    const [allusers, setallusers] = useState([]);
    const navigate = useNavigate();
    

    async function getData() {
        const res = await axios.get('http://localhost:5000/admin/users');
        setallusers(res.data.allusersData);
    }

    useEffect(()=>{
        getData();
    },[])


    return (
        <>
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">User Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allusers.map(user => (
              <div key={user._id} onClick={()=>{navigate(`/admin/users/${user._id}`)
            }} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
              <p className="text-gray-700 mb-2">Username: {user.username}</p>
              <p className="text-gray-700 mb-2">Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
        </>
    )
}


export default Allusers