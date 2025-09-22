import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import LikedBlogRow from '../components/LikedBlogRow';
import toast from 'react-hot-toast';

const LikedBlogs = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, token } = useAppContext();

  const fetchLikedBlogs = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get('/api/blog/liked', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setLikedBlogs(data.blogs);
      } else {
        toast.error("Failed to fetch liked blogs.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedBlogs();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Liked Blogs</h2>
        <div className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full w-fit">
          Total Liked: {likedBlogs.length}
        </div>
      </div>

      {likedBlogs.length > 0 ? (
        <div className="relative overflow-x-auto shadow-xl border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-2 py-3 sm:px-6">#</th>
                <th scope="col" className="px-2 py-3 sm:px-6">Blog Title</th>
                <th scope="col" className="px-2 py-3 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {likedBlogs.map((blog, index) => (
                <LikedBlogRow key={blog._id} blog={blog} index={index + 1} fetchLikedBlogs={fetchLikedBlogs} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">You haven't liked any blogs yet.</p>
        </div>
      )}
    </div>
  );
};

export default LikedBlogs;