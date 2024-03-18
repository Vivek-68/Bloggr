import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom';
import { UserContext } from '../context/userContext';

const LoginPage = () => {

  const {setUserinfo} = useContext(UserContext);

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const [redirect,setRedirect] = useState(false);

  const handleChange = e =>{
    setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/login",{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{'Content-Type':'application/json'},
        credentials:'include'
      });
      if(response.ok){
        setUserinfo({id:response._id,username:response.username})
        setRedirect(true);
      }
      else{
        setRedirect(false);
        alert('Wrong credentials!');
      }
    }
    catch(e){
      console.log(e.message);
    }

  }
  if(redirect){
    return <Navigate to='/' />;
  }

  return (
    <div className='m-4 my-8'>
      <form className='flex flex-col gap-2 sm-w-[50%] lg:w-[40%] border-gray-200 rounded-md border-2 m-auto p-6 font-poppins' onSubmit={handleSubmit}>
      <h2 className='text-xl sm:text-2xl mb-4 font-semibold'>Login to your account</h2>
      <p>Email</p>
      <input className='border-gray-200 border-2 p-2 rounded-md' type='email' placeholder='m@example.com' name='email' onChange={handleChange}/>
      <p>Password</p>
      <input className='border-gray-200 border-2 p-2 rounded-md' type='password' name='password' onChange={handleChange}/>
      <button className='mt-6 rounded-md hover:bg-black hover:text-white border-black border-2 p-1.5' type='submit'>Login</button>
    </form> 
    </div>
    
  )
}

export default LoginPage