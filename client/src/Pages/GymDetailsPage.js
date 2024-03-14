// GymDetailsPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/GymDetailsPage.css';

const GymDetailsPage = () => {
  const { gym_id } = useParams();
  const [gym, setGym] = useState({});
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/gyms/${gym_id}`);
        if (response.ok) {
          const data = await response.json();
          setGym(data.gym);
          setProblems(data.problems);
        } else {
          console.error(`Failed to fetch gym details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching gym details:', error.message);
      }
    };

    fetchGymDetails();
  }, [gym_id]);

  return (
    <div className="container">
      <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
      <h1>{gym.gym_title}</h1>
      <p>{gym.gym_description}</p>

      <div className="problems">
        <h2>Problems</h2>
        <ul>
          {problems.map(problem => (
            <li key={problem.problem_id}>
              <Link to={`/problems/${problem.problem_id}`} className="problem-title">
                {problem.problem_title}
              </Link>
              <div className="hints">
                Hints: {problem.hints}
              </div>
              <div className="solution">
                Solution: {problem.solution}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GymDetailsPage;
