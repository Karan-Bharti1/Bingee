import React, { useState } from 'react'
import axios from "axios"
import { Base_Url } from './utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [isLoginForm,setIsLoginUp]=useState(true)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSignUp=async()=>{
try{
  const res=axios.post(Base_Url+"signup",{email,firstName,lastName,password},{withCredentials:true})
  dispatch(addUser(res.data))
  return navigate("/profile")
}
catch(err){
  console.log(err)
}
}
const handleLogin=async()=>{
  try{
const res=await axios.post(Base_Url+"login",{
  email,
  password
},{
  withCredentials:true
})

const userData=res.data.data
dispatch(addUser(userData))
navigate("/")

  }catch(err){
console.error(err)
setError("Please login with a valid credential")
  }

}
  return (
    <div className='flex justify-center mt-20'><div className="card w-96 bg-base-300 shadow-sm">
  <div className="card-body ">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Bingee</h2>
    </div>
{!isLoginForm &&( <><fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" className="input" placeholder="Type here" onChange={(e)=>setFirstName(e.target.value)}  value={firstName}/>

</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" className="input" placeholder="Type here" onChange={(e)=>setLastName(e.target.value)}  value={lastName}/>

</fieldset></>)}
   <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text" onChange={(e)=>setEmail(e.target.value)} className="input" placeholder="Type here" value={email} />

</fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" className="input" placeholder="Type here" onChange={(e)=>setPassword(e.target.value)}  value={password}/>

</fieldset>
<p className='text-red-600'>{error}</p>
    <div className="mt-6">
    { isLoginForm? <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>:
       <button onClick={handleSignUp}  className="btn btn-primary btn-block">Sign Up</button>}
    </div>
    <a  onClick={()=>setIsLoginUp(!isLoginForm) }   className=" text-center
    text-blue-500 
   
    underline 
    hover:text-pink-900
    cursor-pointer 
    font-medium
    transition duration-300
  ">{isLoginForm?"New User? Sign up here":"Login? Login here"}</a>
  </div>
</div></div>
  )
}

export default Login