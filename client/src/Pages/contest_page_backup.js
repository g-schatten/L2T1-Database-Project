// client/src/Pages/ContestPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('http://localhost:5000/contests');
        if (response.ok) {
          const data = await response.json();
          setContests(data.contests);
        } else {
          console.error(`Failed to fetch contests. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching contests:', error.message);
      }
    };

    fetchContests();
  }, []);

  const filteredContests = contests.filter(contest =>
    contest.contest_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*
  <img
        src={require('../Assests/codeforceLogo.jpg')}
        alt="Codeforces Logo"
        style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}
        onClick={() => (window.location.href = '/home')}
      />
  */
  return (
    <div className='flex'>
      <div>
        <Link to="/home" id="codeforces-logo">
          <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by contest title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2>Contests</h2>
      <ul>
        {filteredContests.map(contest => (
          <li key={contest.contest_id}>{contest.contest_title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContestPage;
