import axios from 'axios'
import React from 'react'
import { Base_Url } from './utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from './utils/feedSlice'

const UserCard = ({user,isFeed}) => {
  const dispatch=useDispatch()
  
  const handleSendRequest=async(status,userId)=>{
try{
await axios.post(Base_Url+"request/send/"+status+"/"+userId,{},{withCredentials:true})
dispatch(removeFeed(userId))
}catch(err){
console.log(err)
}
  } 
  return (
    <div className='mt-20'><div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user?.profileurl ||"https://placehold.co/600x400/orange/white"}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName} {user?.lastName}</h2>
    <p></p>
    <div className="card-actions justify-start">
     {user?.gender?.length>0 && <p>{user?.gender}</p>}
     {user?.age && <p>{user?.age}</p>}
    </div>
   {isFeed && (
  <div className="flex gap-4 mt-4">
    
    <button
      onClick={() => handleSendRequest("interested", user._id)}
      className="
        px-5 py-2 rounded-xl
        bg-gradient-to-r from-green-500 to-emerald-600
        text-white font-semibold
        shadow-md shadow-green-500/30
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
      "
    >
      Interested
    </button>

    <button
      onClick={() => handleSendRequest("ignored", user._id)}
      className="
        px-5 py-2 rounded-xl
        bg-gradient-to-r from-red-500 to-pink-600
        text-white font-semibold
        shadow-md shadow-red-500/30
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
      "
    >
      Ignored
    </button>

  </div>
)}
  </div>
</div></div>
  )
}

export default UserCard;