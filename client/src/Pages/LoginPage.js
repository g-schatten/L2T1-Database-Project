import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("Login successful");
        // Redirect to /home after successful login
        navigate('/home');
      } else {
        const data = await response.json();
        console.error(`Login failed: ${data.message}`);
        // Show an alert when login fails
        window.alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network or other errors
      // Show an alert for network or other errors
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
    <div className="login-container">
      <h2>Login into Codeforces</h2>
      <form onSubmit={handleLogin}>
        <label>
          Handle:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
    </div>
  );
};

export default LoginPage;
