import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,gender,age,profileurl}=user
   
  return (
    <div><div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={profileurl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p></p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary mx-2">Ignore</button>
        <button className="btn btn-primary mx-2">Accept</button>
    </div>
  </div>
</div></div>
  )
}

export default UserCard