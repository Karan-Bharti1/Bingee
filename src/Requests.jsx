import React, { useEffect } from "react";
import axios from "axios";
import { Base_Url } from "./utils/constants";

import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "./utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        Base_Url + "user/requests/received",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
const handleRequest=async(status,_id)=>{
try {
  const res= await axios.post(Base_Url+"request/review/"+status+"/"+_id,{},{
    withCredentials:true
  })
  dispatch(removeRequests(_id))
} catch (error) {
  console.log(error)
}
}
  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          No Requests Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Connection Requests
        </h1>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((request) => {
            const {_id}=request
            const {
             
              firstName,
              lastName,
              profileurl,
              age,
            } = request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-xl transition duration-300"
              >
                
                {/* Left Side */}
                <div className="flex items-center gap-5">
                  
                  {/* Profile Image */}
               <img
  src={profileurl || "https://placehold.co/600x400/orange/white"}
  alt="profile"
  className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
/>

                  {/* User Info */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {firstName} {lastName}
                    </h2>

                    {age && (
                      <p className="text-gray-500 text-lg mt-1">
                        {age} years old
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button onClick={()=>handleRequest("accepted",_id)} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition duration-300">
                    Accept
                  </button>

                  <button onClick={()=>handleRequest("rejected",_id)} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition duration-300">
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;