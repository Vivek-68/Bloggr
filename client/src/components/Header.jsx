import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { AuthContext } from '../auth/Auth';

const Header = () => {

  const {userinfo,setUserinfo} = useContext(UserContext);
  const {setUser} = useContext(AuthContext);
  

  const handleLogin = async() =>{
    try{
        const response = await fetch("http://localhost:3000/profile",{
          credentials:'include',
        });
        const data = await response.json();

        if(response.ok){
        setUserinfo({username:data.username,id:data._id});
        setUser(data.username);
        }
      }
        catch(e){
          console.log(e.message);
        }
  }

  useEffect(()=>{
    handleLogin();
  },[]);

  async function logout(){
    try{
      const response = await fetch("http://localhost:3000/logout",{
        method:'POST',
        credentials:'include'
      });
      setUserinfo(null);
      setUser(null);
    }
    catch(e){
      console.log(e.message);
    }
  }


  return (
    <>
     <div className='flex justify-between items-center text-[#333] mb-3 sm:mb-5'>
        <Link to='/' className='[font-size:clamp(1.5rem,3vw+.75rem,3.5rem)]'>Bloggr.</Link>
        <div className='[font-size:clamp(.75rem,1vw+.25rem,1.75rem)] flex gap-4 md:gap-12 '>
            {userinfo?<Link to ='/create' className='p-2 hover:border-black border-2 border-white rounded-md'>Create new post</Link> :<Link to='/login' className='p-2 hover:border-black border-2 border-white rounded-md'>Login</Link>}
            {userinfo?<a onClick={logout} className='hover:border-black border-white border-2 p-2 rounded-md cursor-pointer'>Logout</a>:<Link to='/register' className='p-2 hover:border-black border-2 border-white rounded-md'>Register</Link>}
        </div>
    </div>
    {/* <div> 
        <div className='w-[50%] [font-size:clamp(.75rem,1vw+.25rem,1.75rem)]  flex flex-col gap-4 md:gap-12 items-center h-[20rem] justify-center gap-8'>
            {userinfo?<Link to ='/create' className='p-2 hover:border-black border-2 border-white rounded-md'>Create new post</Link> :<Link to='/login' className='p-2 hover:border-black border-2 border-white rounded-md'>Login</Link>}
            {userinfo?<a onClick={logout} className='hover:border-black border-white border-2 p-2 rounded-md cursor-pointer'>Logout</a>:<Link to='/register' className='p-2 hover:border-black border-2 border-white rounded-md'>Register</Link>}
        </div>
      
    </div> */}
    </>
   
    
 
  )
}

export default Header