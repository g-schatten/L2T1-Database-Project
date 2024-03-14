// server/controller/problemController.js

const pool = require('../db/db');
const { logged_user_id } = require('./authController');

const getProblems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM problems');
    res.status(200).json({ success: true, problems: result.rows });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getProblemById = async (req, res) => {
  const { problem_id } = req.params;

  try {
    const problemResult = await pool.query(
      'SELECT * FROM problems WHERE problem_id = $1',
      [problem_id]
    );

    if (problemResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'problem not found' });
    }

    const problem = problemResult.rows[0];
    res.status(200).json({ success: true, problem });
  } catch (error) {
    console.error('Error fetching problem details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


//reserved for admin side
const createProblem = async (req, res) => {
  const userId = logged_user_id.value;
  const { problemTitle, contest_id,rating,input_case,output_case } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO problems (user_id, problem_title, problem_description,contestid, rating,input_case,output_case) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *',
      [userId, problemTitle, contest_id, rating, input_case, output_case]
    );
    res.status(201).json({ success: true, message: 'problem created successfully', problem: result.rows[0] });
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getProblems, getProblemById, createProblem };