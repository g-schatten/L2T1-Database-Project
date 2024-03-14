import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate from react-router-dom
import '../styles/CreateBlogPage.css';

const CreateBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogTitle, description }),
        // credentials: 'include', // Send cookies with the request
      });
      if (response.ok) {
        console.log('Blog created successfully');
        navigate('/blogs'); // Redirect to /blogs page after successful blog creation
      } else {
        console.error('Failed to create blog');
        window.alert('Failed to create blog. Please try again.');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      window.alert('An error occurred while creating the blog. Please try again later.');
    }
  };

  return (
    <div className="create-blog-page">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Blog Title:
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;