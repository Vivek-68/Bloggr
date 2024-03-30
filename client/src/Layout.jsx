import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='max-w-[95%] md:max-w-[80%] lg:max-w-[70%] m-auto mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout