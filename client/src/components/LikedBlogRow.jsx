import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const LikedBlogRow = ({ blog, index, fetchLikedBlogs }) => {
  const { axios, token, navigate } = useAppContext();

  const handleUnlike = async () => {
    if (window.confirm("Are you sure you want to remove this from your liked blogs?")) {
      try {
        await axios.post(`/api/blog/${blog._id}/like`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Blog removed from your liked list.");
        fetchLikedBlogs();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-2 sm:px-6 py-4 font-medium text-gray-700">
        {index}
      </td>
      <th 
        scope="row" 
        className="px-2 sm:px-6 py-4 font-medium text-gray-900 hover:underline cursor-pointer"
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        {blog.title}
      </th>
      <td className="px-2 sm:px-6 py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <AiFillHeart className="text-red-500" size={20} title="Liked" />
          <FaTimes 
            className="text-gray-400 hover:text-red-500 cursor-pointer" 
            size={20} 
            onClick={handleUnlike}
            title="Remove from liked"
          />
        </div>
      </td>
    </tr>
  );
};

export default LikedBlogRow;