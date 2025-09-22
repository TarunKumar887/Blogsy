import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminNavbar = () => {
    const { navigate, setToken, setRole, axios } = useAppContext();
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [menuHeight, setMenuHeight] = useState(0);

    useEffect(() => {
        if (mobileMenuRef.current) {
            setMenuHeight(mobileMenuRef.current.scrollHeight);
        }
    }, [mobileOpen]);

    const handleLogout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        delete axios.defaults.headers.common["Authorization"];
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <nav className='sticky top-0 z-10 bg-blue-50 shadow-md'>
            <div className='flex justify-between items-center py-4 px-8 sm:px-20 xl:px-32'>
                <img 
                    onClick={() => navigate('/')} 
                    src={assets.logo} 
                    alt="logo" 
                    className='w-32 sm:w-44 cursor-pointer' 
                />
                <div className="hidden sm:flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/')} 
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-primary text-primary px-8 py-2.5 hover:bg-primary hover:text-white transition'
                    >
                        Home
                    </button>
                    <button 
                        onClick={handleLogout}
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-red-500 text-red-500 px-8 py-2.5 hover:bg-red-500 hover:text-white transition'
                    >
                        Logout
                    </button>
                </div>
                <div className="sm:hidden flex items-center">
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
                        {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>
            </div>
            <div
                ref={mobileMenuRef}
                style={{ maxHeight: mobileOpen ? `${menuHeight}px` : '0px' }}
                className="sm:hidden overflow-hidden transition-max-height duration-300 ease-in-out bg-blue-50"
            >
                <div className="flex flex-col gap-4 p-4 border-t border-gray-200">
                    <button onClick={() => { navigate('/'); closeMobileMenu(); }} className='w-full text-left p-2 rounded hover:bg-gray-100'>
                        Home
                    </button>
                    <button onClick={() => { handleLogout(); closeMobileMenu(); }} className='w-full text-left p-2 rounded text-red-500 hover:bg-red-50'>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;