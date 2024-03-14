// GymPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GymPage.css';

const GymPage = () => {
  const [gyms, setGyms] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await fetch('http://localhost:5000/gyms');
        if (response.ok) {
          const data = await response.json();
          setGyms(data.gyms);
        } else {
          console.error(`Failed to fetch gyms. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching gyms:', error.message);
      }
    };

    fetchGyms();
  }, []);

  return (
    <div className='container'>
      <div className='logo'>
        <Link to="/home" id="codeforces-logo">
          <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
        </Link>
      </div>
      <h2>Gyms</h2>
      <div className="gym-list">
        {gyms.map(gym => (
          <Link to={`/gyms/${gym.gym_id}`}>
            <div key={gym.gym_id} className="gym-box">
              <h3>{gym.gym_title}</h3>
              <p>{gym.gym_description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GymPage;
