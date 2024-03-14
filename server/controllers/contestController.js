// server/controller/contestController.js

const pool = require('../db/db'); // Update this line to point to your correct db.js path

const getContests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contests');
    res.status(200).json({ success: true, contests: result.rows });
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getContestById = async (req, res) => {
  const { contest_id } = req.params;

  try {
    const contestResult = await pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id]);
    const problemsResult = await pool.query(`
      SELECT p.*, array_agg(t.tag_name) AS tags
      FROM problems p
      LEFT JOIN problemtag pt ON p.problem_id = pt.problem_id
      LEFT JOIN tags t ON pt.tag_id = t.tag_id
      WHERE p.contest_id = $1
      GROUP BY p.problem_id
    `, [contest_id]);

    if (contestResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }

    const contest = contestResult.rows[0];
    const problems = problemsResult.rows.map(problem => ({
      ...problem,
      tags: problem.tags.filter(tag => tag !== null) // Filter out null tags
    }));

    res.status(200).json({ success: true, contest, problems });
  } catch (error) {
    console.error('Error fetching contest details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = { getContests, getContestById };
