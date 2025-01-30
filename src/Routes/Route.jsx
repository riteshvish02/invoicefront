import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Home from '../Components/Home'
import SignIn from '../Components/SignIn'
import AuthPage from '../Components/AuthPage'
import History from '../Components/History'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedin } from '../Store/Actions/UserAction'

const route = () => {
const dispatch = useDispatch()
const{isAuthenticated} =useSelector((state=>state?.user))
useEffect(()=>{
dispatch(userLoggedin())
},[dispatch])

 
  return (
    <Routes>
        <Route  index  path="/" element={<AuthPage />} />
        <Route index  path="/signin" element={<SignIn />} />
        <Route  index path="/login" element={<Login />} />

        {!isAuthenticated && <Route path="/" element={<AuthPage />} />}
        {isAuthenticated && <Route  path='/invoice' element={<Home/>}/>}
        {isAuthenticated && <Route path='/history' element={<History/>}/>}


 


    </Routes>
  )
}

export default route
