import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const Show = () => {
    const [oneusers, setOneusers]=useState({});
    const params = useParams();
    const navigate= useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/users/${params.id}`)
        .then((res)=>{
            setOneusers(res.data)
        })
    },[]);

    async function deleteHandle(id){
      await axios.delete(`http://localhost:5000/admin/users/${id}`)
      navigate("/admin/users")
    }

    async function editHandle(id){
      navigate(`/admin/users/${id}/edit`);
    }
  return (
    <>
    <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">User Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">name:{oneusers.name}</h3>
              <p className="text-gray-700 mb-2">Username: {oneusers.username}</p>
              <p className="text-gray-700 mb-2">Email: {oneusers.email}</p>
              <button onClick={()=>{editHandle(oneusers._id)}}  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">Edit</button>
              <button onClick={()=>deleteHandle(oneusers._id)} className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 ml-2 rounded-md transition duration-300">Delete</button>
          </div>
          
      </div>
      
    </div>
    
    </>
    
  )
}

export default Show