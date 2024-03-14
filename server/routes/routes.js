// /server/routes/routes.js:

const express = require('express');
const router = express.Router();
const { registerUser, getRankings, getUserProfile } = require('../controllers/userController');
const { getContests, getContestById } = require('../controllers/contestController');
const { getGyms, getGymById } = require('../controllers/gymController');
const { getBlogs, getBlogById, createBlog } = require('../controllers/blogController');
const { loginUser, logoutUser } = require('../controllers/authController');
const { getLoggedUserProfile } = require('../controllers/loggedUserProfileController');
const { submitSolution, getContestProblem } = require('../controllers/contestProblemController');
const { getProblems, getProblemById, createProblem } = require('../controllers/problemController');
const { submitGymProblem } = require('../controllers/gymProblemController');
// const authenticateToken = require('../middlewares/authenticateToken.js'); // Import middleware

//Auth Routes
router.post('/logout', logoutUser);
router.post('/login', loginUser);

//User Routes
router.post('/register', registerUser);
router.get('/rankings', getRankings);
router.get('/profile/:user_id', getUserProfile);

//Contest Routes
router.get('/contests', getContests);
router.get('/contests/:contest_id', getContestById);
router.get('/contests/:contest_id/problems/:problem_id', getContestProblem);

//Gym Routes
router.get('/gyms', getGyms);
router.get('/gyms/:gym_id', getGymById);

//Blog Routes
router.get('/blogs', getBlogs);
router.get('/blogs/:blog_id', getBlogById);
router.post('/create-blog', createBlog);

// User profile route
router.get('/userprofile', getLoggedUserProfile);

// Submit Routes
router.post('/submit-solution', submitSolution);
router.post('/submit-gym-problem', submitGymProblem);

// Problem Routes
router.get('/problems', getProblems);
router.get('/problems/:problem_id', getProblemById);
router.post('/create-problem', createProblem);

module.exports = router;