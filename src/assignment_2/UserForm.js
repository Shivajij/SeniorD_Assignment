import "../App.css"
import React, { useState } from 'react';
import { isAlpha, isEmpty, withoutNumbersAndSpecialChars } from './Validation';

const UserForm = ({ addUser }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(userName)) {
      setError('Username cannot be empty');
    } else if (!isAlpha(withoutNumbersAndSpecialChars(userName))) {
      setError('Username cannot contain numbers or special characters');
    } else {
      setError('');
      addUser(userName);
      setUserName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
      <input
  className={error ? 'input error' : 'input'}
  type="text"
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
  placeholder="Enter username"
/>
{error && <p>{error}</p>}
<button className="button primary-button" type="submit">
  Add User
</button>
    </form>
  );
};

export default UserForm;
