/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { BsExclamationCircle } from 'react-icons/bs';
import { CiVideoOn } from 'react-icons/ci';
import { IoReturnUpBack } from 'react-icons/io5';
import { MdFullscreenExit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import settingPageImage from '../../assets/setting.svg';
import About from '../../pages/About/About';
import { selectUserDetails } from '../../selectors/userSelector';
import MessageInput from '../MessageInput/MessageInput';
import './chatWindow.css';

// const messages = [
//   { text: 'Hey there! How can I help you today?', time: '10:05', isCurrentUser: false },
//   { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
//   // Add more messages as needed
// ];

function ChatWindow({ visibleBackArrow = false, setShowChatWindow, fullScreen }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const messageSectionRef = useRef(null);
  const theme = useSelector(state => state.theme);
  const user = useSelector(selectUserDetails);
  const chatWindowRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // global state
  const chatWindowInfo = useSelector(state => state.chatWindowInfo);


  // scroll to bottom
  useEffect(() => {
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
    }
    fullScreen && handleFullScreen()
  }, []);



  const handleFullScreen = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    }
  };
  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };


  if (chatWindowInfo.userInfo === null) {
    return (
      <div className="w-full hidden lg:block h-full">
        <img src={settingPageImage} className="w-full h-screen" alt="" />
      </div>
    )
  }

  return (
    <div
      ref={chatWindowRef}
      style={{ position: 'relative' }}
      className="w-full flex flex-col bg-backgroundColor relative text-primaryTextColor overflow-y-scroll h-screen"
    >
      <Navbar
        visibleBackArrow={visibleBackArrow}
        setShowChatWindow={setShowChatWindow}
        setShowUserDetails={setShowUserDetails}
        handleFullScreen={handleFullScreen}
        handleExitFullScreen={handleExitFullScreen}
        isFullScreen={isFullScreen}
        chatWindowInfo={{
          ...chatWindowInfo.userInfo,
          typingStatus: chatWindowInfo.typingStatus
        }}

      />
      <div
        style={{
          backgroundColor: theme.theme === 'dark' ? '#181818' : theme.background || '#D9D9D9',
        }}
        ref={messageSectionRef}
        className="overflow-y-auto flex-grow px-4 py-2"
      >
        {/* {messages.map((item, index) => (
          <div key={index} className={`w-full flex ${item.isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div
              style={{
                backgroundColor: theme.theme === 'light' ? '#dadada' : '#212121',
                color: theme.theme === 'light' ? 'black' : 'white',
              }}
              className="max-w-md p-2 text-xs md:p-3 rounded-lg text-primaryTextColor"
            >
              {item.text}
              <div className="flex items-center justify-end mt-1">
                <span className="block text-xs text-gray-600">{item.time}</span>
                {item.isCurrentUser && item.isRead && <span className="text-xs text-green-500 ml-2">&#10003;</span>}
              </div>
            </div>
          </div>
        ))} */}

      </div>
      <MessageInput user={user} friendInfo={{ ...chatWindowInfo.userInfo, typingStatus: chatWindowInfo.typingStatus }} />
      <About showUserDetails={showUserDetails} setShowUserDetails={setShowUserDetails} chatWindowInfo={chatWindowInfo} />
    </div>
  );
}

export const Navbar = ({ visibleBackArrow, setShowChatWindow, setShowUserDetails, handleFullScreen, handleExitFullScreen, isFullScreen, chatWindowInfo }) => {
  const imageUr = chatWindowInfo.user_profile_view && chatWindowInfo.profile_picture_url.imageUrl;
  const name = chatWindowInfo.full_name;
  const userName = chatWindowInfo.username;



  return (
    <nav className="w-full navbar h-[71px] flex-shrink-0 top-0 flex items-center justify-between px-4 bg-backgroundColor text-primaryTextColor">
      <div className="flex items-start gap-4">
        {visibleBackArrow && <GoBackSvg setShowChatWindow={setShowChatWindow} />}
        <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden bg-blue-gray-300">
          <img src={imageUr} alt="profile Picture" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-medium text-primaryTextColor">{name}</div>
          <div className="text-green-500 text-xs">ONLINE</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CiVideoOn className="text-xl cursor-pointer" />
        <BsExclamationCircle onClick={() => setShowUserDetails(true)} className="text-xl cursor-pointer" />
        {isFullScreen ? <MdFullscreenExit onClick={handleExitFullScreen} className="text-2xl cursor-pointer" /> : <AiOutlineFullscreen onClick={handleFullScreen} className="text-xl cursor-pointer" />}
      </div>
    </nav>
  );
};

export const GoBackSvg = ({ setShowChatWindow }) => {
  const handleBackClick = () => {
    setShowChatWindow(false);
  };
  return (
    <div onClick={handleBackClick} className="w-6 h-6 cursor-pointer">
      <IoReturnUpBack />
    </div>
  );
};

export default ChatWindow;
