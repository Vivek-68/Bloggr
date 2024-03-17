import React, { useState } from 'react'

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await fetch('http://localhost:3000/register',{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{'Content-Type':'application/json'}
      })
    }
    catch(err){
      console.log(err.message);
    }

  }

  return (
    <div className='m-4 my-24'>
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