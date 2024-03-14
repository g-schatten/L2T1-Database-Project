// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  // const [userId, setUserId] = useState('');
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Set userId based on logged_user_id when the component mounts
  //   setUserId(logged_user_id);
  // }, []);

  // const handleProfileClick = () => {
  //   // Navigate to profile if userId is not 0, otherwise navigate to login
  //   if (userId !== 0) {
  //     navigate(`/profile/${userId}`);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  return (
    <div className="home-page">
      <div className="header">
        <div className="options-bar">
          <Link to="/contests" className="option">Contest</Link>
          <Link to="/gyms" className="option">Gym</Link>
          <Link to="/blogs" className="option">Blogs</Link>
          <Link to="/rankings" className="option">Rankings</Link>
        </div>
        {/* Render the link to the profile page with the user ID */}
        <Link to="/userprofile" className="profile-option">Profile</Link>
      </div>
      <div className="content">
        <h2>Welcome to Codeforces!</h2>
      </div>
    </div>
  );
};

export default HomePage;