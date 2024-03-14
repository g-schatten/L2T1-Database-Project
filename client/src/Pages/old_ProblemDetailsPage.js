// client/src/Pages/ProblemDetailsPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/ProblemDetailsPage.css';

const ProblemDetailsPage = () => {
  const { problem_id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/problems/${problem_id}`);
        if (response.ok) {
          const data = await response.json();
          setProblem(data.problem);
        } else {
          console.error(`Failed to fetch problem details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching problem details:', error.message);
      }
    };

    fetchProblem();
  }, [problem_id]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="problem-details-container">
      <div className="header">
        <div className="logo">
          <Link to="/home" id="codeforces-logo">
            <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
          </Link>
        </div>
      </div>
      <div className="problem-content">
        <div className="problem-statement">
          <h2>{problem.problem_title}</h2>
          <div className="problem-description" dangerouslySetInnerHTML={{ __html: problem.problem_description }} />
          <div className="input-output" align = 'center'>
            <h3>Input</h3>
            <pre>{problem.input_case}</pre>
            <h3>Output</h3>
            <pre>{problem.output_case}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailsPage;