// server/controllers/authController.js

const pool = require('../db/db');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);

        if (result.rows.length === 1) {
            const user = result.rows[0];

            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Passwords match, login successful
                req.session.UserId = user.user_id; // Store user information in session
                console.log('User Id Stored in Session:', req.session.userId);
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                // Incorrect password, send error response
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            // User not found, send error response
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error executing login query:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.status(200).json({ success: true, message: 'Logout successful' });
        }
    });
};

module.exports = { loginUser, logoutUser };
