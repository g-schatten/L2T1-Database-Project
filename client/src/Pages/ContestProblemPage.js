import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/ContestProblemPage.css';

const ContestProblemPage = () => {
    const [problem, setProblem] = useState(null);
    const { contest_id, problem_id } = useParams();
    const navigate = useNavigate();
    const [solution, setSolution] = useState('');
    
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/contests/${contest_id}/problems/${problem_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProblem(data.problems[0]);
                } else {
                    console.error('Failed to fetch problem');
                }
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
    
        fetchProblem();
    }, [contest_id, problem_id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting solution:', solution); // Log the solution before submitting
        try {
            const response = await fetch('http://localhost:5000/submit-solution', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contest_id,
                    problem_id,
                    solve: solution
                })
            });
    
            const responseData = await response.json(); // Parse response data
            if (response.ok) {
                console.log('Solution submitted successfully');
                console.log('Response:', responseData); // Log response data
                window.alert('Submitted successfully'); // Show success message in alert
                navigate(`/contests/${contest_id}`);
            } else {
                console.error('Failed to submit solution:', responseData.message); // Log error message
                window.alert('Failed to submit solution in response to error: ' + responseData.message); // Show error message in alert
            }
        } catch (error) {
            console.error('Error submitting solution:', error);
            window.alert('Failed to submit solution in try catch block: ' + error.message); // Show error message in alert
        }
    };
    
    return (
        <div className="contest-problem-page">
            <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
            {problem && (
                <div className="problem-container">
                    <h2>{problem.problem_title}</h2>
                    <div className="problem-info">
                        <p>{problem.problem_description}</p>
                    </div>
                    
                    <h1>test input case</h1>
                        <div className="problem-cases">
                            <div className="input-case">
                                <p>{problem.input_case}</p>
                            </div>
                        </div>
                    
                    
                    <h1>test output case</h1>
                        <div className="problem-cases">
                            <div className="output-case">
                                <p>{problem.output_case}</p>
                            </div>
                        </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={solution}
                            onChange={(e) => setSolution(e.target.value)}
                            placeholder="Enter your solution"
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ContestProblemPage;
