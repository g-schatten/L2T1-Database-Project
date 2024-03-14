// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import RankingPage from './Pages/RankingPage';
import ContestPage from './Pages/ContestPage';
import ContestDetailsPage from './Pages/ContestDetailsPage';
import GymPage from './Pages/GymPage';
import GymDetailsPage from './Pages/GymDetailsPage';
import BlogPage from './Pages/BlogPage';
import BlogDetailsPage from './Pages/BlogDetailsPage';
import CreateBlogPage from './Pages/CreateBlogPage';
import LoggedUserProfilePage from './Pages/LoggedUserProfilePage';
import ContestProblemPage from './Pages/ContestProblemPage';
import ProblemDetailsPage from './Pages/ProblemDetailsPage';
    
const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/login" element = {<LoginPage />} />
                <Route path="/register" element = {<RegisterPage />} />
                <Route path="/home" element = {<HomePage/>} />
                <Route path="/profile/:user_id" element = {<ProfilePage/>} />
                <Route path="/rankings" element={<RankingPage />} />
                <Route path="/contests" element={<ContestPage />} />
                <Route path="/contests/:contest_id" element={<ContestDetailsPage />} />
                <Route path="/gyms" element={<GymPage />} />
                <Route path="/gyms/:gym_id" element={<GymDetailsPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blogs/:blog_id" element={<BlogDetailsPage />} />
                <Route path="/create-blog" element={<CreateBlogPage />} />
                <Route path="/userprofile" element={<LoggedUserProfilePage />} />
                <Route path="/contests/:contest_id/problems/:problem_id" element={<ContestProblemPage />} />
                <Route path="/problems/:problem_id" element={<ProblemDetailsPage />} />
                <Route path="*" element = {<HomePage/>} />
            </Routes>
        </div>
    </Router>
);

/*

<Route path="/gyms" element={<GymPage />} />
<Route path="/gyms/:gym_id" element={<GymDetailsPage />} />

*/

export default App;
