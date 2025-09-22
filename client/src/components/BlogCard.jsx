import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogCard = ({ blog, onClick }) => {
  const { title, description, category, image, likes, _id } = blog;
  const { userId, token, fetchBlogs } = useAppContext();

  const isLiked = userId && likes.includes(userId);

  const handleLike = async (e) => {
    e.stopPropagation();

    if (!token) {
      toast.error("Please log in to like a post.");
      return;
    }

    try {
      await axios.post(`/api/blog/${_id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Failed to like the blog:", error);
    }
  };

  return (
    <div onClick={onClick} className='relative w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer bg-white'>
      <img src={image} alt={title} className='aspect-video object-cover' />
      <div className='p-5'>
        <span className='mb-2 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <h5 className='mt-2 mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{ "__html": description.slice(0, 80) }}></p>
      </div>

      <div className='absolute top-4 right-4 flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full'> {isLiked ? (
        <AiFillHeart size={20} className="text-red-500 cursor-pointer" onClick={handleLike} />
      ) : (
        <AiOutlineHeart size={20} className="text-gray-600 cursor-pointer" onClick={handleLike} />
      )}
        <span className="text-sm font-semibold text-gray-700">{likes.length}</span>
      </div>
    </div>
  );
};

export default BlogCard;