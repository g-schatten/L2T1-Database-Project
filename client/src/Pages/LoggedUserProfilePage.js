// LoggedUserProfilePage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoggedUserProfilePage.css';
// import codeforcesLogo from '../Assets/codeforceLogo.jpg';

const LoggedUserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from backend
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/userprofile');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.userProfile);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  //handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Logout successful');
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  //test this
  useEffect(() => {
    if (userProfile && userProfile.user_id === 0) {
      window.alert('No User Logged in');
      navigate('/login');
    }
  }, [userProfile, navigate]);

  return (
    <div className="page-container">
      <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
      <h2>User Profile</h2>
      <div className="profile-box">
        {userProfile && (
          <div className="profile-details">
            <p><strong>User Name:</strong> {userProfile.user_name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Current Rating:</strong> {userProfile.current_rating}</p>
            <p><strong>Max Rating:</strong> {userProfile.max_rating}</p>            
            <p><strong>Color:</strong> {userProfile.color}</p>
            <p><strong>Country:</strong> {userProfile.country}</p>
            <p><strong>Institution:</strong> {userProfile.institution}</p>
            <p><strong>Registration Date:</strong> {new Date(userProfile.registration_date).toLocaleDateString()}</p>
            <p><strong>Contribution:</strong> {userProfile.contribution}</p>
            <p><strong>Problems Solved:</strong> {userProfile.problems_solved}</p>
          </div>
        )}
      </div>
      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
    </div>
  );
};

export default LoggedUserProfilePage;
