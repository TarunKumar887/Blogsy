import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaBars } from 'react-icons/fa';

const ProfileNavbar = ({ toggleSidebar }) => {
  const { navigate, setToken, setRole, axios } = useAppContext();
  
  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className='sticky top-0 z-20 bg-blue-50 shadow-md'>
      <div className='flex justify-between items-center py-4 px-4 sm:px-20 xl:px-32'>
        
       
        <div className="sm:hidden">
            <button onClick={toggleSidebar} className="p-2">
                <FaBars size={22} />
            </button>
        </div>

        <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />

      
        <div className="hidden sm:flex items-center gap-4">
          <button onClick={() => navigate('/')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5 hover:bg-blue-700 hover:text-white transition-colors'>
            Home
          </button>
          <button  onClick={handleLogout} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-500 text-white px-8 py-2.5 hover:bg-red-700 transition-colors'>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavbar;