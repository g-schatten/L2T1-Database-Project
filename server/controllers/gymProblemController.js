const pool = require('../db/db');
const { logged_user_id } = require('./authController');

const submitGymProblem = async (req, res) => {
    const userId = logged_user_id.value;
    const { problem_id, solve } = req.body;
  
    try {
      if (userId !== 0) {
        const result = await pool.query(
          'INSERT INTO submissions (submission_time, user_id, contest_id, problem_id, solve, is_correct, is_gym) VALUES (NOW(), $1, $2, $3, $4, $5, $6)',
          [userId, null, problem_id, solve, 'yes', 'yes']
        );
  
        res.status(201).json({ success: true, message: 'Solution submitted successfully', userId, submission: result.rows[0]});
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error submitting solution:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  };

module.exports = { submitGymProblem };