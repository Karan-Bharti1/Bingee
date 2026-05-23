import React from 'react'
import { useState,useEffect } from 'react'
import UserCard from './UserCard'
import { Base_Url } from './utils/constants'
import axios from "axios"
import { addUser } from './utils/userSlice'
import { useDispatch } from 'react-redux'
const EditProfile = ({user}) => {
   
    const [firstName,setFirstName]=useState('')
   const [lastName,setLastName]=useState('')
   const [age,setAge]=useState('')
   const [gender,setGender]=useState('')
   const [profileurl,setProfileurl]=useState('')
   const dispatch=useDispatch()
    useEffect(() => {
    if (user) {
     setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
      setAge(user.age || '')
      setGender(user.gender || '')
      setProfileurl(user.profileurl || '')
    }
  }, [user])
  const editProfile=async()=>{
  try{
const res=await axios.patch(Base_Url+"profile/edit",{firstName,lastName,profileurl,gender,age},{
    withCredentials:true                     
})

dispatch(addUser(res?.data?.data?.loggedUser))
  }catch(err){
    console.log(err)
  }
  }
  return (
       <div className='flex justify-center gap-8'>
    <div>  <div className='flex justify-center mt-20'><div className="card w-96 bg-base-300 shadow-sm">
  <div className="card-body ">
{ user &&   <span className="badge badge-xs badge-warning">{user.firstName}'s Data</span>}
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Edit your Profile</h2>
    </div>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name :</legend>
  <input type="text" onChange={(e)=>setFirstName(e.target.value)} className="input" placeholder="Type here" value={firstName} />

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name :</legend>
  <input type="text" onChange={(e)=>setLastName(e.target.value)} className="input" placeholder="Type here" value={lastName} />

</fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo URL :</legend>
  <input type="text" className="input" placeholder="Type here" onChange={(e)=>setProfileurl(e.target.value)}  value={profileurl}/>

</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Age :</legend>
  <input type="number" className="input" placeholder="Type here" onChange={(e)=>setAge(e.target.value)}  value={age}/>

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Gender :</legend>

  <select
    className="select w-50 box-border"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Others</option>
  </select>
</fieldset>
{/* <p className='text-red-600'>{error}</p> */}
    <div className="mt-6">
      <button className="btn btn-primary btn-block" onClick={editProfile}>Save Edit Data</button>
    </div>
  </div>
</div></div></div>
<UserCard user={{firstName,lastName,gender,age,profileurl}} isFeed={false}/>
    </div>
  )
}

export default EditProfile