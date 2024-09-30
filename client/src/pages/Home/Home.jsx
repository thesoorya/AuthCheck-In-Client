import React, { useContext } from 'react';
import { StoreContext } from '../../context/Store';

const Home = () => {
  const { user, logout } = useContext(StoreContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
