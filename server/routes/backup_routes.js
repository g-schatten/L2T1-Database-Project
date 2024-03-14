// /server/routes/routes.js

const express = require('express');
const router = express.Router();
const { registerUser, getRankings, getUserProfile } = require('../controllers/userController');
const { getContests, getContestById } = require('../controllers/contestController');
const { getGyms, getGymById } = require('../controllers/gymController');
const { getBlogs, getBlogById, createBlog } = require('../controllers/blogController');
const { loginUser, logoutUser } = require('../controllers/authController');

router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/rankings', getRankings);
router.get('/profile/:user_id', getUserProfile);
router.get('/contests', getContests);
router.get('/contests/:contest_id', getContestById);
router.get('/gyms', getGyms);
router.get('/gyms/:gym_id', getGymById);
router.get('/blogs', getBlogs);
router.get('/blogs/:blog_id', getBlogById);
router.post('/create-blog', createBlog);

module.exports = router;