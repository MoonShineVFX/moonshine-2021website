import React, { useContext } from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Components/Auth";
const useAuth=()=>{
  const user = useContext(AuthContext);
  console.log(user.currentUser)
  if(user.currentUser ){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props:any) =>{

  const auth=useAuth()

  return auth?<Navigate to="/admin"/>: <Outlet/>
}

export default PublicRoutes;