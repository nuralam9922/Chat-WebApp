import React, { useEffect, useRef, useState } from 'react';
import { FcVideoCall } from 'react-icons/fc';
import { LiaLinkSolid } from 'react-icons/lia';
import { PiNotificationFill } from 'react-icons/pi';
import userImage from '../../assets/userImage.png'; // Assuming you have a user image asset
import BottomBarForMobile from '../../components/Sidebar/BottomBarForMobile';
import './About.css';
import { Switch } from '@material-tailwind/react';
import { RiGhostLine } from 'react-icons/ri';
import { FaArrowRightToBracket } from 'react-icons/fa6';

function About({ showUserDetails = true, setShowUserDetails }) {
  const aboutRef = useRef();
  const [showMedia, setShowMedia] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      removeEventListener('mousedown', handleClickOutside);
    };
  }, [aboutRef]);

  return (
    <>
      <div
        ref={aboutRef}
        className={`fixed top-0 right-0 h-screen w-full lg:w-[400px] bg-backgroundColor text-primaryTextColor shadow-md z-[100] transition-transform duration-300 flex flex-col  ${
          showUserDetails ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 h-f">
          <h2 className="text-lg font-semibold">User Info</h2>
          <button onClick={() => setShowUserDetails(false)} className="text-gray-500 hover:text-primaryTextColor text-xl">
            &times;
          </button>
        </div>
        <div className="p-4 w-full">
          <div className="flex items-center mb-4">
            <img src={userImage} className="w-16 h-16 rounded-full mr-4" alt="User Avatar" />
            <div>
              <h2 className="text-xl font-semibold text-primaryTextColor">Shreyansh Shah</h2>
              <a href="tel:+916265081928" className="text-blue-600">
                +91 6265 081 928
              </a>
            </div>
          </div>
          <div className="flex items-center justify-around w-full py-3">
            <button className="flex items-center justify-center flex-col w-20 h-10  text-primaryTextColor  text-white rounded-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 5.625H14.25C15.0456 5.625 15.8087 5.94107 16.3713 6.50368C16.9339 7.06629 17.25 7.82935 17.25 8.625V17.625C17.25 17.8239 17.171 18.0147 17.0303 18.1553C16.8897 18.296 16.6989 18.375 16.5 18.375H4.5C3.70435 18.375 2.94129 18.0589 2.37868 17.4963C1.81607 16.9337 1.5 16.1706 1.5 15.375V6.375C1.5 6.17609 1.57902 5.98532 1.71967 5.84467C1.86032 5.70402 2.05109 5.625 2.25 5.625V5.625Z"
                  stroke="#4B4B4B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M17.25 10.5L22.5 7.5V16.5L17.25 13.5" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p className="text-secondaryTextColor">Audio</p>
            </button>
            <button className="flex items-center justify-center w-20 h-10 flex-col rounded-md">
              <FcVideoCall className="text-black" />
              <p className="text-secondaryTextColor">Video</p>
            </button>
          </div>
          <div className=" py-4">
            <div className="text-sm text-primaryTextColor">About</div>
            <p className="text-sm text-secondaryTextColor mt-1">Hi there, I am using</p>
          </div>
          <div className="text-primaryTextColor py-4">
            <div className="w-full justify-between items-center flex">
              <p className="text-sm text-primaryTextColor">Media, links and docs</p>
              <p onClick={() => setShowMedia(!showMedia)} className="flex items-center justify-center gap-2 cursor-pointer">
                201 <FaArrowRightToBracket className="text-primaryTextColor" />
              </p>
            </div>
            <div className="flex space-x-2 mt-2">
              <img src="path_to_media1.jpg" alt="Media 1" className="w-24 h-24 object-cover rounded-md bg-blue-gray-200" />
              <img src="path_to_media2.jpg" alt="Media 2" className="w-24 h-24 object-cover rounded-md bg-blue-gray-200" />
              <img src="path_to_media3.jpg" alt="Media 3" className="w-24 h-24 object-cover rounded-md bg-blue-gray-200" />
            </div>
          </div>

          <div className=" py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-primaryTextColor flex items-center justify-center gap-2">
                <PiNotificationFill /> <p>Mute Notifications</p>
              </div>
              <Switch defaultChecked color="blue" />
            </div>
          </div>
          <div className="flex mt-5 w-full">
            <button className=" w-full flex-grow bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-2">Block</button>
          </div>
        </div>

        <Media showMedia={showMedia} setShowMedia={setShowMedia} />
        <BottomBarForMobile />
      </div>
    </>
  );
}

const Media = ({ showMedia, setShowMedia }) => {
  const [showSection, setShowSection] = useState('Media');
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full lg:w-[400px] bg-backgroundColor shadow-md z-[100] p-4 transition-transform duration-300 flex flex-col  ${
        showMedia ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between  border-b border-gray-200 h-f">
        <h2 className="text-lg font-semibold">Media</h2>
        <button onClick={() => setShowMedia(false)} className="text-gray-500 hover:text-primaryTextColor text-xl">
          &times;
        </button>
      </div>

      <div className="w-full flex items-center justify-between my-10">
        <h1 onClick={() => setShowSection('Media')} className={` cursor-pointer ${showSection === 'Media' && 'underline'} underline-offset-8`}>
          Media
        </h1>
        <h1 onClick={() => setShowSection('Docs')} className={` ${showSection === 'Docs' && 'underline'} underline-offset-8 cursor-pointer`}>
          Docs
        </h1>
        <h1 onClick={() => setShowSection('Links')} className={` ${showSection === 'Links' && 'underline'} underline-offset-8 cursor-pointer`}>
          Links
        </h1>
      </div>
      <div style={{ display: showSection === 'Media' ? 'grid' : 'none' }} className="w-full grid-cols-3 grid gap-2">
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
        <div className="w-full h-32 bg-blue-gray-300"></div>
      </div>
      <div style={{ display: showSection === 'Docs' ? 'grid' : 'none' }} className="w-full overflow-y-scroll">
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
        <div className="w-full h-32 border-2 rounded-xl flex items-start gap-3 shadow-md overflow-hidden">
          <div className="w-1/3 flex items-center justify-center h-full bg-blue-gray-300">
            <LiaLinkSolid className="text-5xl" />
          </div>
          <h2 className="text-linkColor">https://codingmonk.in/blogs</h2>
        </div>
      </div>
      <div style={{ display: showSection === 'Links' ? 'grid' : 'none' }} className="w-ful overflow-y-scroll flex flex-col gap-3">
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
        <div>
          <div className="w-full min-h-40 bg-blue-gray-100 rounded-md"></div>
          <div className="w-full justify-between items-center flex mt-3">
            <h1>THis is file name</h1>
            <h1>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2.625V15.0938" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M4.59375 9.1875L10.5 15.0938L16.4062 9.1875" stroke="black" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.28125 17.7188H17.7188" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
              </svg>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
