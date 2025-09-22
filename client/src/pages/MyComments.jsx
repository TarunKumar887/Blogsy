import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const MyComments = () => {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, token, navigate } = useAppContext();

  const fetchMyComments = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get('/api/blog/my-comments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setMyComments(data.comments);
      } else {
        toast.error("Failed to fetch your comments.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching your comments.");
      console.error("Fetch my comments error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComments();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading your comments...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Comments</h2>
        <div className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
          Total Comments: {myComments.length}
        </div>
      </div>

      {myComments.length > 0 ? (
        <div className="space-y-4">
          {myComments.map((comment) => (
            <div key={comment._id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700 italic">"{comment.content}"</p>
              <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <span>Commented on </span>
                <span  className="font-semibold text-primary cursor-pointer hover:underline" onClick={() => navigate(`/blog/${comment.blog._id}`)}>
                  {comment.blog.title}
                </span>
                <span className="text-gray-400">
                  {' on '}
                  {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">You haven't posted any comments yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyComments;