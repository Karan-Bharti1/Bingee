import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Base_Url } from './utils/constants'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
  const fetchUser=async()=>{
    if(user) return
try{
const res=await axios.get(Base_Url+"profile/view",{
  withCredentials:true
})

dispatch(addUser(res?.data?.user))
}catch(err){
if(err.status === 401){
 navigate("/login")
}
 
  console.error(err)
}}
useEffect(()=>{
fetchUser()
},[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body