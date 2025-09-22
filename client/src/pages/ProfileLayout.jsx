import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileNavbar from "../components/ProfileNavbar";
import ProfileSidebar from "../components/ProfileSidebar";

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ProfileNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative">
       
        <ProfileSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

     
        <main
          className={` flex-1 p-4 sm:p-8 overflow-y-auto  relative z-0 // Lower z-index than overlay and sidebar transition-all duration-300 // Smooth transition for blur/unblur ${isSidebarOpen ? 'sm:ml-0' : ''} // Adjust margin if needed, though sidebar is fixed`}
        >
       
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-transparent z-10 sm:hidden backdrop-blur-sm"  onClick={toggleSidebar}></div>
          )}
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;