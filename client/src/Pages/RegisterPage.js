import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [institution, setInstitution] = useState('');

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        password,
        email,
        country,
        institution,
      }),
    });

    if (response.ok) {
      console.log("Registration successful");
      window.location.href = "/login";
    } else {
      const data = await response.json();
      console.error(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
  

  return (
    <div>
      <Link to="/home" id="codeforces-logo"><img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" id="codeforces-logo" /></Link>
    <div className="register-container">
      <h2>Register an Account</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={user_name}
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
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <br />
        <label>
          Institution:
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
    </div>
  );
};

export default RegisterPage;
