import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Editusers = () => {

  const [user,setUser] =useState({
    name:"",
    username:"",
    email:"",
    phone:""
  });

  const [errors,setErrors]=useState({});
  const navigate = useNavigate();
  const params= useParams();

  const changeHandle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user, [name]: value,
    });
  };
 
  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/users/${params.id}`)
        .then((res)=>{
            setUser(res.data);
        })
  },[])

  const validateForm = ()=>{
    let isValid= true;
    const errors={};
    const regexname=/^[A-Za-z\s]{3,30}$/;
    const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexphone = /^[6789][0-9]{9,14}$/;

    if (!regexname.test(user.name)) {
      errors.name = 'Invalid Name ';
      isValid = false;
    }
    if(!regexusername.test(user.username)){
      errors.username = 'Invalid username';
      isValid = false;
    }

    if (!regexEmail.test(user.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }
    if(!regexphone.test(user.phone)){
      errors.phone = 'Invalid phone number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  async function submitHandler(e){
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    try {
      
      await axios.put(`http://localhost:5000/admin/users/${params.id}/edit`,user);
      navigate("/admin/users");
    } catch (error) {
      console.error("Invalid data sending");
    }
    
  }

  return (
    <>
    <div className=' max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16'>
          <h2 className='text-2xl mb-4'>Register</h2>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name:</label>
              <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''} `} type="text" id='name' value={user.name} onChange={changeHandle} name='name' placeholder='Name' required/>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <span id='nameerror' className='text-red-700'></span>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username:</label>
              <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''} `} type="text" id='username' value={user.username} onChange={changeHandle} name='username' placeholder='Enter Your username' required />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email:</label>
              <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''} `} type="email" id='email' value={user.email} onChange={changeHandle} name='email' placeholder='Enter your email' required />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="phone">Phone:</label>
              <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''} `} type="number" id='phone' value={user.phone} onChange={changeHandle} name='phone' placeholder='Phone number' label="name" required />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Save</button>
            </div>

          </form>
        </div>
    </>
  )
}

export default Editusers