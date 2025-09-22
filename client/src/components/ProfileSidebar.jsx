import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa'; 

const ProfileSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { navigate, setToken, setRole, axios } = useAppContext();
  const activeLinkStyle = "bg-white/20";

  const handleLogout = () => {
    toggleSidebar(); 
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <aside className={` fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white p-4 flex flex-col pt-8  transform transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center mb-8 px-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        <button onClick={toggleSidebar} className="sm:hidden p-1">
          <FaTimes size={20} />
        </button>
      </div>
      
      <ul className="space-y-2">
        <li className="sm:hidden">
          <NavLink  to='/'  onClick={toggleSidebar} className="flex items-center gap-4 py-3 px-4 rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink  to='/profile/liked'  onClick={toggleSidebar} className={({isActive}) => `flex items-center gap-4 py-3 px-4 rounded-md cursor-pointer hover:bg-white/10 transition-colors ${isActive && activeLinkStyle}`}>
            <p>Liked Blogs</p>
          </NavLink>
        </li>
        <li>
          <NavLink  to='/profile/comments'  onClick={toggleSidebar} className={({isActive}) => `flex items-center gap-4 py-3 px-4 rounded-md cursor-pointer hover:bg-white/10 transition-colors ${isActive && activeLinkStyle}`}>
            <p>My Comments</p>
          </NavLink>
        </li>
        <li className="sm:hidden">
          <button  onClick={handleLogout} className="w-full flex items-center gap-4 py-3 px-4 rounded-md cursor-pointer text-white hover:bg-white/10 transition-colors">
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;