import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';
import { Tooltip } from 'react-tooltip';

const MainLayout = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="h-screen w-[70px] flex-shrink-0 bg-sideBarBackgroundColor hidden lg:block">
        <Sidebar />
      </div>

      <Outlet />
      
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MainLayout;
