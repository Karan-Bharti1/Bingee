import React, { useEffect } from 'react'
import { Base_Url } from './utils/constants'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
// import UserCard from './UserCard'
import UserCard from './UserCard'
const Feed = () => {
  const dispatch=useDispatch()
  const feedData=useSelector(store=>store.feed)
  console.log(feedData)
  const getFeedData=async()=>{
    try{
const res=await axios.get(Base_Url+"feed",{withCredentials:true})
dispatch(addFeed(res?.data?.data))
    }catch(err){
console.log(err)
    }
  }
  useEffect(()=>{
    getFeedData()
  },[])
   if(!feedData) return
   if(feedData.length <=0) return <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          No New Users Found
        </h1>
      </div>
  return (
    <div className='flex justify-center my-3'>
{feedData && <UserCard  user={feedData[0]} isFeed={true}/>}

    </div>
  )
}

export default Feed