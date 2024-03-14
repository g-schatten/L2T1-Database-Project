// client/src/Pages/ContestPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContestPage.css';

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

  const truncateDescription = (description) => {
    if (description) {
      const words = description.split(' ');
      const truncatedWords = words.slice(0, 15);
      return truncatedWords.join(' ') + (words.length > 15 ? '...' : '');
    }
    // Handle null description, return an empty string or another default value if needed
    return '';
  };

  const filteredContests = contests.filter(contest =>
    contest.contest_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex'>
      <div className='header'>
        <div className='logo'>
          <Link to="/home" id="codeforces-logo">
            <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
          </Link>
        </div>
        <div className='search-and-create'>
          <input
            type="text"
            placeholder="Search by contest title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/create-contest" className="create-contest-link">Create a Contest</Link>
        </div>
      </div>
      <h2>Contests</h2>
      <div className="contest-list">
        {filteredContests.map(contest => (
          <Link to={`/contests/${contest.contest_id}`}>
            <div key={contest.contest_id} className="contest-box">
              <h3>{contest.contest_title}</h3>
              <p>{truncateDescription(contest.contest_description)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContestPage;
