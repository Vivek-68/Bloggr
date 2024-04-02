import React from 'react'
import { useContext } from 'react'
import {Navigate,Outlet, useLocation} from 'react-router-dom'
import { AuthContext } from '../auth/Auth'
const PreventAuth = () => {
  const {user} = useContext(AuthContext);
  const location = useLocation();
  return (
    user
    ?<Navigate to='/' state={{from:location}} replace/>
    :<Outlet/>
  );
}

export default PreventAuth