import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import LoginPromptModal from '../components/LoginPromptModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, blogs } = useAppContext();
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    
    if (token) {
      navigate(`/blog/${blogId}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
      <Newsletter />
      <Footer />
      <LoginPromptModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default Home;