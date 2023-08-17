import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import ThemeToggle from './ThemeToggle';
import '../App.css'; 

const Assignment2 = () => {
  const [users, setUsers] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const addUser = (user) => {
    if (!users.some((u) => u === user)) {
      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const removeUser = () => {
    if (users.length > 0) {
      setUsers((prevUsers) => prevUsers.slice(0, prevUsers.length - 1));
    }
  };

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <div>
      <ThemeToggle toggleTheme={toggleTheme} />
      <UserForm addUser={addUser} />
      <UserList users={users} removeUser={removeUser} />
    </div>
  );
};

export default Assignment2;
