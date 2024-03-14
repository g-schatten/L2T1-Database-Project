import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user_id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${user_id}`);
        if (response.ok) {
          const userData = await response.json();
          setUserProfile(userData.userProfile); // Assuming the server response has a key 'userProfile' containing user data
        } else {
          console.error(`Failed to fetch user profile. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [user_id]);

  return (
    <div className="profile-container">
      <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
      {userProfile ? (
        <div className="profile-details">
          <h2>Profile</h2>
          <div className="profile-info">
            <p><strong>Handle:</strong> {userProfile.user_name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Max Rating:</strong> {userProfile.max_rating}</p>
            <p><strong>Current Rating:</strong> {userProfile.current_rating}</p>
            <p><strong>Color:</strong> {userProfile.color}</p>
            <p><strong>Country:</strong> {userProfile.country}</p>
            <p><strong>Institution:</strong> {userProfile.institution}</p>
            <p><strong>Registration Date:</strong> {userProfile.registration_date}</p>
            <p><strong>Contribution:</strong> {userProfile.contribution}</p>
            <p><strong>Problems Solved:</strong> {userProfile.problems_solved}</p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
