// client/src/Pages/ProblemDetailsPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/ProblemDetailsPage.css';

const ProblemDetailsPage = () => {
  const { problem_id } = useParams();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [code, setCode] = useState('');

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

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit-gym-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem_id: problem.problem_id, // Replace with the appropriate problem ID
          solve: code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Solution submitted successfully:', data);
        // You can add additional logic here, such as displaying a success message
      } else {
        console.error('Failed to submit solution:', response.status);
        // You can add additional logic here, such as displaying an error message
      }
    } catch (error) {
      console.error('Error submitting solution:', error);
      // You can add additional logic here, such as displaying an error message
    }
  };

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
          <p className="small-text" align='center'> Rating: {problem.rating}</p>
          <div className="problem-description" dangerouslySetInnerHTML={{ __html: problem.problem_description }} />
          <div className="input-output">
            <h3>Sample Input</h3>
            <pre>{problem.input_case}</pre>
            <h3>Sample Output</h3>
            <pre>{problem.output_case}</pre>
          </div>
        </div>
        <div className="problem-sidebar">
      <div className="sidebar-section">
        <h3>Submit Code</h3>
        <div className="language-dropdown">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="">Select Language</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python3">Python 3</option>
            <option value="java">Java</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>
        <textarea
          value={code}
          onChange={handleCodeChange}
          rows={10}
          placeholder="Enter your code here..."
        />
        <button onClick={handleSubmit} disabled={!selectedLanguage}>
          Submit
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProblemDetailsPage;