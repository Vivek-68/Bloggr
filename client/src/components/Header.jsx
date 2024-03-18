import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext';

const Header = () => {

  const {userinfo,setUserinfo} = useContext(UserContext);
  const [username,setUsername] = useState(null);

  const handleLogin = async() =>{
    try{
        const response = await fetch("http://localhost:3000/profile",{
          credentials:'include',
        });
        if(response.ok){
        const data = await response.json();
        setUserinfo({username:data.username,id:data._id});
        }
      }
        catch(e){
          console.log(e.message);
        }
  }

  useEffect(()=>{
    handleLogin();
  },[userinfo]);

  async function logout(){
    try{
      const response = await fetch("http://localhost:3000/logout",{
        method:'POST',
        credentials:'include'
      });
      setUserinfo(null);
    }
    catch(e){
      console.log(e.message);
    }
  }


  return (
    <div className='flex justify-between items-center text-[#333]'>
        <Link to='/' className='[font-size:clamp(1.5rem,3vw+1rem,4rem)]'>Bloggr.</Link>
        <div className='[font-size:clamp(.75rem,1vw+.25rem,2rem)] flex gap-4 md:gap-12'>
            {userinfo?<Link to ='/create'>Create new post</Link> :<Link to='/login'>Login</Link>}
            {userinfo?<a onClick={logout}>Logout</a>:<Link to='/register'>Register</Link>}
        </div>
    </div>
  )
}

export default Header