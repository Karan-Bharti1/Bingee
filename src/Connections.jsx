import React, { useEffect } from "react";
import { Base_Url } from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_Url + "user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          No Connections Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          My Connections
        </h1>

        {/* Connections List */}
        <div className="space-y-6">
          {connections.map((connection) => {
            const {
              firstName,
              lastName,
              profileurl,
              _id,
              age,
            } = connection;

            return (
              <div
                key={_id}
                className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-5 hover:shadow-xl transition duration-300"
              >
                
                {/* Profile Image */}
                <img
                  alt="profile"
                  src={profileurl}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />

                {/* User Info */}
                <div className="flex flex-col">
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;