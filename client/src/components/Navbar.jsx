import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';

const DesktopNav = ({ token, role, navigate, handleLogout }) => (
    <div className="hidden sm:flex items-center gap-4">
        {!token ? (
            <>
                <button 
                    onClick={() => navigate('/register')} 
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-primary text-primary px-8 py-2.5 hover:bg-primary hover:text-white transition'
                >
                    Register
                </button>
                <button 
                    onClick={() => navigate('/login')} 
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:brightness-90 transition-all duration-300'
                >
                    Login <img src={assets.arrow} className="w-3" alt="arrow" />
                </button>
            </>
        ) : (
            <>
                <button 
                    onClick={() => navigate(role === 'admin' ? '/admin' : '/profile/liked')} 
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-blue-700 text-white px-8 py-2.5 hover:brightness-90 transition-all duration-300'
                >
                    {role === 'admin' ? 'Dashboard' : 'Profile'} <img src={assets.arrow} className="w-3" alt="arrow" />
                </button>
                <button 
                    onClick={handleLogout} 
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-red-500 text-white bg-red-500 px-8 py-2.5 hover:bg-red-700 hover:text-white transition'
                >
                    Logout
                </button>
            </>
        )}
    </div>
);


const MobileNav = ({ token, role, navigate, handleLogout, closeMenu }) => (
    <div className="flex flex-col gap-2 p-4 border-t border-gray-200">
        {!token ? (
            <>
                <button onClick={() => { navigate('/register'); closeMenu(); }} className='w-full text-center py-3 rounded text-primary border border-primary hover:bg-gray-100'>Register</button>
                <button onClick={() => { navigate('/login'); closeMenu(); }} className='w-full text-center py-3 rounded bg-primary text-white hover:bg-primary/90'>Login</button>
            </>
        ) : (
            <>
                <button onClick={() => { navigate(role === 'admin' ? '/admin' : '/profile/liked'); closeMenu(); }} className='w-full text-left p-3 rounded hover:bg-gray-100'>
                    {role === 'admin' ? 'Dashboard' : 'Profile'}
                </button>
                <button onClick={() => { handleLogout(); closeMenu(); }} className='w-full text-left p-3 rounded text-red-500 hover:bg-red-50'>
                    Logout
                </button>
            </>
        )}
    </div>
);

const Navbar = () => {
    const { navigate, token, role, setToken, setRole, axios } = useAppContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [menuHeight, setMenuHeight] = useState(0);

    useEffect(() => {
        if (mobileMenuRef.current) {
            setMenuHeight(mobileMenuRef.current.scrollHeight);
        }
    }, [isMobileMenuOpen, token]);

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
        <nav className='sticky top-0 z-10 bg-blue-50 shadow-md'>
            <div className='flex justify-between items-center py-4 px-4 sm:px-8 xl:px-32'>
                <div className="sm:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                        {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>

                <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-36 sm:w-44 cursor-pointer'/>

                <DesktopNav token={token} role={role} navigate={navigate} handleLogout={handleLogout} />
            </div>

            <div ref={mobileMenuRef} style={{ maxHeight: isMobileMenuOpen ? `${menuHeight}px` : '0px' }} className="sm:hidden overflow-hidden transition-max-height duration-300 ease-in-out bg-blue-50" >
                <MobileNav token={token} role={role} navigate={navigate} handleLogout={handleLogout} closeMenu={() => setIsMobileMenuOpen(false)} />
            </div>
        </nav>
    );
};

export default Navbar;