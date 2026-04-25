import React, { useEffect } from 'react'
import { Base_Url } from './utils/constants'
import axios from "axios"
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
const Feed = () => {
  const dispatch=useDispatch()
  const feedData=useSelector(store=>store.feed)
  console.log(feedData)
  const getFeedData=async()=>{
    try{
const res=await axios.get(Base_Url+"feed/1/10",{withCredentials:true})
dispatch(addFeed(res?.data?.data))
    }catch(err){
console.log(err)
    }
  }
  useEffect(()=>{
    getFeedData()
  },[])
  return (
    <div className='flex justify-center my-3'>
{feedData && <UserCard  user={feedData[0]}/>}

    </div>
  )
}

export default Feed