import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {

  const [redirect,setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/register',{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{'Content-Type':'application/json'}
      })
         if(response.status >= 400){
          alert("Registration failed!");
         }
         else{
          setRedirect(true);
          alert("Registration Successful!");
         }
    }
    catch(err){
      console.log(err.message);
      
    }

  }
if(redirect){
  return <Navigate to='/login'/>;
}
  return (
    <div className='m-4 my-8'>
      <form className='flex flex-col gap-2 sm-w-[50%] lg:w-[40%] border-gray-200 rounded-md border-2 m-auto p-6 font-poppins' onSubmit={handleSubmit}>
        <h2 className='text-xl sm:text-2xl mb-4 font-semibold'>Create an account</h2>
        <p>Email</p>
        <input className='border-gray-200 border-2 p-2 rounded-md' type='email' placeholder='m@example.com' name='email' value={formData.email} onChange={(e) => setFormData(
          prev => ({ ...prev, [e.target.name]: e.target.value })
        )} />
        <p>Password</p>
        <input className='border-gray-200 border-2 p-2 rounded-md' type='password' name='password' value={formData.password} onChange={(e) => setFormData(
          prev => ({ ...prev, [e.target.name]: e.target.value })
        )} />
        <button className='mt-6 rounded-md hover:bg-black hover:text-white border-black border-2 p-1.5' type='submit'>Create account</button>
      </form>
    </div>
  )
}

export default RegisterPage