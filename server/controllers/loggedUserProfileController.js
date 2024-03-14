// /server/controllers/loggedUserProfileController.js

const pool = require('../db/db');
const { logged_user_id } = require('./authController');

const getLoggedUserProfile = async (req, res) => {
  const userId = logged_user_id.value; // Get userId from the auth controller
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
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

// Add functions to update user profile and logout as needed

module.exports = { getLoggedUserProfile };