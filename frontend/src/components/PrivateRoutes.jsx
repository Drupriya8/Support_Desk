import React from 'react'
import {Navigate , Outlet} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'

function PrivateRoutes() {
  
    const {loggedIn , checkingStatus} = useAuthStatus()
  
    if(checkingStatus){
        return <Spinner/>
    }
  
    return loggedIn ? <Outlet/> : <Navigate to='/login'/>
   
}

export default PrivateRoutes
