// client/src/Pages/RankingPage.js

import React, { useEffect, useState } from 'react';
import '../styles/RankingPage.css';
import { Link } from 'react-router-dom';

const RankingPage = () => {
    const [rankedUsers, setRankedUsers] = useState([]);

    useEffect(() => {
        const fetchRankedUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/rankings');
                if (response.ok) {
                    const data = await response.json();
                    setRankedUsers(data.users);
                } else {
                    console.error(`Failed to fetch rankings. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching rankings:', error.message);
            }
        };

        fetchRankedUsers();
    }, []);

    return (
        <div className="container">
            <Link to="/home" id="codeforces-logo">
                <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
            </Link>
            <h2>Codeforces Rankings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User Name</th>
                        <th>Current Rating</th>
                        <th>Max Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedUsers.map((user, index) => (
                        <tr key={user.user_id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/profile/${user.user_id}`}>{user.user_name}</Link></td>
                            <td>{user.current_rating}</td>
                            <td>{user.max_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankingPage;
