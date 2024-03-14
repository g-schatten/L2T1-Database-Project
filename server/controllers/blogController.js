// server/controller/blogController.js

const pool = require('../db/db');
const { logged_user_id } = require('./authController');

const getBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    res.status(200).json({ success: true, blogs: result.rows });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getBlogById = async (req, res) => {
  const { blog_id } = req.params;

  try {
    const blogResult = await pool.query(
      'SELECT b.*, u.user_name FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE b.blog_id = $1',
      [blog_id]
    );

    if (blogResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const blog = blogResult.rows[0];
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createBlog = async (req, res) => {
  const userId = logged_user_id.value;
  const { blogTitle, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO blogs (user_id, blog_title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, blogTitle, description]
    );
    res.status(201).json({ success: true, message: 'Blog created successfully', blog: result.rows[0] });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog };
