// client/src/Pages/BlogPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs);
        } else {
          console.error(`Failed to fetch blogs. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.blog_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-container">
      <div className="header">
        <div className="logo">
          <Link to="/home" id="codeforces-logo">
            <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
          </Link>
        </div>
        <div className="actions">
          <Link to="/create-blog" className="create-blog-link">Create a Blog</Link>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <h2>Blogs</h2>
      <div className="blog-list">
        {filteredBlogs.map(blog => (
          <Link to={`/blogs/${blog.blog_id}`} key={blog.blog_id}>
            <div className="blog-box">
              <h3>{blog.blog_title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
