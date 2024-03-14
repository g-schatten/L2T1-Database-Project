const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const logged_user_id = { value: 0 };

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);

        if (result.rows.length === 1) {
            const user = result.rows[0];

            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Generate JWT token
                // const token = jwt.sign({ userId: user.user_id }, 'gasgasgas', { expiresIn: '1h' });
                
                logged_user_id.value = user.user_id;

                res.status(200).json({ success: true, logged_user_id });
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
    // Since we're using JWT, there's no need to explicitly logout on the server side
    // The client can simply discard the token

    //REMOVE LATER
    logged_user_id.value = 0;
    
    //REMOVE LATER

    res.status(200).json({ success: true, message: 'Logout successful' });
};

module.exports = { loginUser, logoutUser, logged_user_id };