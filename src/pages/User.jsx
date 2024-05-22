import React from 'react'
import EditProfile from './EditProfile'
import BottomBarForMobile from '../components/Sidebar/BottomBarForMobile'
import settingPageImage from '../assets/setting.svg';

function user() {
  return (
    <div className="w-full h-screen relative flex items-center justify-between">
      <div className="h-screen w-full flex justify-between md:flex-row bg-backgroundColor select-none ">
        <EditProfile />
      </div>

      <div className="w-full hidden lg:block h-full bg-backgroundColor">
        <img src={settingPageImage} className="w-full h-screen" alt="" />
      </div>

      <BottomBarForMobile />
    </div>
  );
}

export default user