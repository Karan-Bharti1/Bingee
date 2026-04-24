import React, { useState } from 'react'
import axios from "axios"
import { Base_Url } from './utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
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
  }

}
  return (
    <div className='flex justify-center mt-20'><div className="card w-96 bg-base-300 shadow-sm">
  <div className="card-body ">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Bingee</h2>
    </div>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text" onChange={(e)=>setEmail(e.target.value)} className="input" placeholder="Type here" value={email} />

</fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" className="input" placeholder="Type here" onChange={(e)=>setPassword(e.target.value)}  value={password}/>

</fieldset>
    <div className="mt-6">
      <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
    </div>
  </div>
</div></div>
  )
}

export default Login