// userController.js
const pool = require('../db/db');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const { user_name, password, email, country, institution } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (user_name, password, email, country, institution, current_rating, max_rating, contribution, color, registration_date, problems_solved) ' +
            'VALUES ($1, $2, $3, $4, $5, 0, 0, 0, $6, CURRENT_DATE, 0) RETURNING *',
            [user_name, hashedPassword, email, country, institution, 'grey']
        );

        res.status(201).json({ success: true, message: 'Registration successful', user: result.rows[0] });
    } catch (error) {
        console.error('Error executing registration query:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getRankings = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY COALESCE(current_rating, -1) DESC LIMIT 100');
        res.status(200).json({ success: true, users: result.rows });
    } catch (error) {
        console.error('Error fetching rankings:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getUserProfile = async (req, res) => {
    const { user_id } = req.params; // Change to params to get user_id from URL parameters

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length > 0) {
            const userProfile = result.rows[0];
            res.status(200).json({ success: true, userProfile });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { registerUser, getRankings, getUserProfile };
