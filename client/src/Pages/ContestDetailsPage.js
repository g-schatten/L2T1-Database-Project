import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import '../styles/ContestDetailsPage.css';

const ContestDetailsPage = () => {
  const { contest_id } = useParams();
  const [contest, setContest] = useState({});
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/contests/${contest_id}`);
        if (response.ok) {
          const data = await response.json();
          setContest(data.contest);
          setProblems(data.problems);
        } else {
          console.error(`Failed to fetch contest details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching contest details:', error.message);
      }
    };

    fetchContestDetails();
  }, [contest_id]);

  return (
    <div className="container">
      <Link to="/home" id="codeforces-logo">
        <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
      </Link>

      <h1>{contest.contest_title}</h1>

      <p>{contest.contest_description}</p>

      <div className="problems">
        <h2>Problems</h2>
        <ul>
          {problems.map(problem => (
            <li key={problem.problem_id}>
              <Link to={`problems/${problem.problem_id}`} className="problem-title">
                {problem.problem_title}
              </Link>
              <div className="tags">
                {problem.tags.slice(0, 3).map(tag => (
                  <span key={tag.tag_id} className="tag">{tag.tag_name}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContestDetailsPage;
