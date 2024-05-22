import React from 'react';
import { BiMessageSquare } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { CgProfile } from 'react-icons/cg';
const navinks = [
  { name: 'messages', path: '/', icon: <BiMessageSquare className="text-xl text-primaryTextColor" /> },
  { name: 'friends feed', path: '/feed', icon: <MdOutlineSubscriptions className="text-xl text-primaryTextColor" /> },
  { name: 'add friends', path: '/friends', icon: <FiUserPlus className="text-xl text-primaryTextColor" /> },
  { name: 'profile page', path: '/user', icon: <CgProfile className="text-xl text-primaryTextColor" /> },
  { name: 'setting page', path: '/settings', icon: <IoSettingsOutline className="text-xl text-primaryTextColor" /> },
];
function BottomBarForMobile() {
  const [width] = useWindowWidth();
  const mdMode = width >= 970;
  return (
    <div
      style={{
        display: mdMode ? 'none' : 'flex',
      }}
      className="w-full py-2  fixed bottom-0 left-0 bg-backgroundColor flex items-center justify-between px-2 z-[999]"
    >
      {navinks.map(link => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => `flex items-center justify-center w-12 h-12 rounded-md transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
        >
          {link.icon}
        </NavLink>
      ))}
    </div>
  );
}

export default BottomBarForMobile;
