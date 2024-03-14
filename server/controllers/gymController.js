// server/controller/gymController.js

const pool = require('../db/db');

const getGyms = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gym');
    res.status(200).json({ success: true, gyms: result.rows });
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getGymById = async (req, res) => {
  const { gym_id } = req.params;

  try {
    const gymResult = await pool.query('SELECT * FROM gym WHERE gym_id = $1', [gym_id]);
    const problemsResult = await pool.query(`
      SELECT p.*, array_agg(t.tag_name) AS tags
      FROM gymproblem gp
      JOIN problems p ON gp.problem_id = p.problem_id
      LEFT JOIN problemtag pt ON p.problem_id = pt.problem_id
      LEFT JOIN tags t ON pt.tag_id = t.tag_id
      WHERE gp.gym_id = $1
      GROUP BY p.problem_id
    `, [gym_id]);

    if (gymResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    const gym = gymResult.rows[0];
    const problems = problemsResult.rows;

    res.status(200).json({ success: true, gym, problems });
  } catch (error) {
    console.error('Error fetching gym details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getGyms, getGymById };
