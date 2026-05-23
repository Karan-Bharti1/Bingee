import React from 'react'
import UserCard from './UserCard'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
const Profile = () => {
  const user=useSelector(store=>store.user)
  
  return (
    <div className='flex justify-center gap-8'>
      
      <EditProfile user={user}/>
    
    </div>
  )
}

export default Profile