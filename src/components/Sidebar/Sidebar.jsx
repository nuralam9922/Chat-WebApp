import React from 'react';
import { BiMessageSquare } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiUserPlus } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const navlinks = [
  { name: 'messages', path: '/', icon: <BiMessageSquare /> },
  { name: 'friends feed', path: '/feed', icon: <MdOutlineSubscriptions /> },
  { name: 'add friends', path: '/friends', icon: <FiUserPlus /> },
];

function SidebarMini() {
  return (
    <div className="w-full h-screen text-primaryTextColor flex flex-col justify-between shadow-lg">
      {/* Logo */}
      <div>
        <div className="flex flex-col items-center py-4">
          <svg className="" viewBox="0 0 350 212.909198897464">
            <defs id="SvgjsDefs1194"></defs>
            <g id="SvgjsG1195" featurekey="e7LhAk-0" transform="matrix(7.777777777777778,0,0,7.777777777777778,81.66666666666667,-27.22222222222222)" fill="#5e63b6">
              <title xmlns="http://www.w3.org/2000/svg">bluetooth</title>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M5.5,20.5A.5.5,0,0,1,5,20l-.4-4A7.34,7.34,0,0,1,3,11.5c0-4.41,4-8,9-8s9,3.59,9,8-4,8-9,8a10,10,0,0,1-2.67-.36L5.67,20.47A.49.49,0,0,1,5.5,20.5ZM12,4.5c-4.41,0-8,3.14-8,7a6.37,6.37,0,0,0,1.47,4,.5.5,0,0,1,.11.26l.35,3.51,3.21-1.17a.5.5,0,0,1,.31,0A9,9,0,0,0,12,18.5c4.41,0,8-3.14,8-7S16.41,4.5,12,4.5Z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M12.5,13.5a.5.5,0,0,1-.47-.33l-.81-2.32L7.72,12.59a.5.5,0,1,1-.45-.89l4-2A.5.5,0,0,1,12,10l.82,2.34,3.5-1.62a.5.5,0,0,1,.42.91l-4,1.86A.5.5,0,0,1,12.5,13.5Z"
              ></path>
            </g>
          </svg>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-4">
          {navlinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `flex items-center justify-center w-12 h-12 rounded-md transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
            >
              {link.icon}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center py-4 space-y-4">
        <NavLink
          to="/user"
          className={({ isActive }) => `flex items-center justify-center w-12 h-12 rounded-md transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
        >
          <CgProfile />
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `flex items-center justify-center w-12 h-12 rounded-md transition ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
        >
          <IoSettingsOutline />
        </NavLink>
      </div>
    </div>
  );
}

export default SidebarMini;
