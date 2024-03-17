import React from 'react'

const LoginPage = () => {
  return (
    <div className='m-4 my-24'>
      <form className='flex flex-col gap-2 sm-w-[50%] lg:w-[40%] border-gray-200 rounded-md border-2 m-auto p-6 font-poppins'>
      <h2 className='text-xl sm:text-2xl mb-4 font-semibold'>Login to your account</h2>
      <p>Email</p>
      <input className='border-gray-200 border-2 p-2 rounded-md' type='email' placeholder='m@example.com' name='email'/>
      <p>Password</p>
      <input className='border-gray-200 border-2 p-2 rounded-md' type='password' name='password'/>
      <button className='mt-6 rounded-md hover:bg-black hover:text-white border-black border-2 p-1.5' type='submit'>Login</button>
    </form> 
    </div>
    
  )
}

export default LoginPage