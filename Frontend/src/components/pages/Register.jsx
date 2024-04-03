import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../store/auth';

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = ()=>{
    let isValid= true;
    const errors={};
    const regexname=/^[A-Za-z\s]{3,30}$/;
    const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexphone = /^[6789][0-9]{9,14}$/;
    const regexPassword = /^[A-Za-z-@!#%^&* .0-9]{8,16}$/; // Minimum eight characters, at least one letter and one number

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

    if (!regexPassword.test(user.password)) {
      errors.password = 'Password must contain minimum eight characters';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };



  const changeHandle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user, [name]: value,
    });
  };
  
  
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }
    try {
        const response = await axios.post("http://localhost:5000/auth/register", user)
        if(response.status===200){
          setUser({name:"",username:"", email:"",phone:"", password:""});
          navigate("/login") 
        }
        else{
          console.log("Invalid credential");
        }
         
    } catch (error) {
      console.error("There was an error sending the data",error);
      
    }
   
  }

  return (
    <>
        <div className=' max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16'>
          <h2 className='text-2xl mb-4'>Register</h2>
          <form onSubmit={registerSubmit}>
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
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password:</label>
              <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''} `} type="password" id='password' value={user.password} onChange={changeHandle} name='password' placeholder='password' required />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Register</button>
            </div>

          </form>
        </div>
    </>
  )
}

export default Register