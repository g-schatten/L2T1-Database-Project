// client/src/Pages/BlogDetailsPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/BlogDetailsPage.css';

const BlogDetailsPage = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${blog_id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data.blog);
        } else {
          console.error(`Failed to fetch blog details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error.message);
      }
    };

    fetchBlog();
  }, [blog_id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-details-container">
      <div className="header">
        <div className="logo">
          <Link to="/home" id="codeforces-logo">
            <img src={require('../Assests/codeforceLogo.jpg')} alt="Codeforces Logo" />
          </Link>
        </div>
      </div>
      <div className="blog-details">
        <h2>{blog.blog_title}</h2>
        <p>{blog.description}</p>
        <p>Posted by:
            <Link to={`/profile/${blog.user_id}`} className="user-link">
                {blog.user_name}
            </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
