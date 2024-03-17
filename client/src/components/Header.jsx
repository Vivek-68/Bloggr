import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between items-center text-[#333]'>
        <Link to='/' className='[font-size:clamp(1.5rem,3vw+1rem,4rem)]'>Bloggr.</Link>
        <div className='[font-size:clamp(.75rem,1vw+.25rem,2rem)] flex gap-4 md:gap-12'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    </div>
  )
}

export default Header