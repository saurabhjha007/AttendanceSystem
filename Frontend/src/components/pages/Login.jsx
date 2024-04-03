import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useAuth } from '../store/auth';

const Login = () => {
  const [user,setUser]=useState({
    username:"",
    password:""
  });

  const [errors, setErrors] = useState({}); 
 const navigate = useNavigate();
 const {storeToken} = useAuth();

 const validateForm = ()=>{
  let isValid= true;
  const errors={};
  const regexusername=/^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
  const regexPassword = /^[A-Za-z-@!#%^&* .0-9]{8,16}$/;

  if(!regexusername.test(user.username)){
    errors.username = 'Invalid username';
    isValid = false;
  }

  if (!regexPassword.test(user.password)) {
    errors.password = 'Invalid password';
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

  const changeHandle = (e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({
      ...user,[name]:value,
    });
  };

  const loginSubmit = async (e)=>{
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }
    try {
    
          const response = await axios.post("http://localhost:5000/auth/login",user)
          if (response.status === 201) {
            setUser({username:"", password:""});
            storeToken(response.data.token);
            navigate("/")
          } else {
            console.log("Invalid credential")  
          }
          
          
    } catch (error) {
      setUser({username:"", password:""});
      alert("Invalid credential")
      console.error("There was an error sending the data",error);
    }
    
  }
  return (
    <>
        <div className='max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-2xl mb-4'>Login</h2>
          <form onSubmit={loginSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username:</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id='username' value={user.username} onChange={changeHandle} name='username' placeholder='username' required />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password:</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id='password' value={user.password} onChange={changeHandle} name='password' placeholder='password' required />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Login</button>
            </div>          
          </form>
        </div>
    </>
  )
}

export default Login