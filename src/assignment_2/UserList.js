import React from 'react';

const UserList = ({ users, removeUser }) => {
  return (
    <div style={{marginTop:"20px"}}>
      {users.map((user, index) => (
        <div key={index}>{user}</div>
      ))}
      {users.length > 0 && <button onClick={removeUser} style={{backgroundColor:"#b02a37",color:"white",fontSize:"16px", borderRadius:"5px", padding:5,fontWeight:"bold", marginTop:"20px"}}>Remove User</button>}
    </div>
  );
};

export default UserList;
