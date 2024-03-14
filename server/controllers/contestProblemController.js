// /server/controllers/contestProblemController.js

const pool = require('../db/db');
const { logged_user_id } = require('./authController');

const getContestProblem = async (req, res) => {
    const { problem_id } = req.params;
    
    try {
        const result = await pool.query('SELECT * FROM problems WHERE problem_id = $1', [problem_id]);
        res.status(200).json({ success: true, problems: result.rows });
    } catch (error) {
        console.error('Error fetching contest problems:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const submitSolution = async (req, res) => {
  const userId = logged_user_id.value;
  const { contest_id, problem_id, solve } = req.body;

  try {
    if (userId !== 0) {
      const result = await pool.query(
        'INSERT INTO submissions (submission_time, user_id, contest_id, problem_id, solve, is_correct, is_gym) VALUES (NOW(), $1, $2, $3, $4, $5, $6)',
        [userId, contest_id, problem_id, solve, 'yes', 'no']
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


module.exports = { submitSolution, getContestProblem };