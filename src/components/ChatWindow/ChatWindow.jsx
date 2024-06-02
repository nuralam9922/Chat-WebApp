/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { BsExclamationCircle } from 'react-icons/bs';
import { CiVideoOn } from 'react-icons/ci';
import { IoReturnUpBack } from 'react-icons/io5';
import { MdFullscreenExit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import settingPageImage from '../../assets/setting.svg';
import About from '../../pages/About/About';
import { selectUserDetails } from '../../selectors/userSelector';
import { setShowChatWindow } from '../../slices/chatWindowSlice';
import MessageDropdown from '../MessageDropdown/MessageDropdown';
import MessageInput from '../MessageInput/MessageInput';
import './chatWindow.css';
import Messages from './Messages';

function ChatWindow({ visibleBackArrow = false, setShowChatWindow, showChatWindow }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const theme = useSelector(state => state.theme);
  const user = useSelector(selectUserDetails);
  const chatWindowRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const chatWindowInfo = useSelector(state => state.chatWindowInfo);

  const handleFullScreen = useCallback(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    }
  }, []);

  const handleExitFullScreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  }, []);

  const themeBackgroundColor = useMemo(() => theme.theme === 'dark' ? '#181818' : theme.background || '#D9D9D9', [theme]);

  if (chatWindowInfo.userInfo === null) {
    return (
      <div className="w-full hidden lg:block h-full bg-backgroundColor">
        <img src={settingPageImage} className="w-full h-screen" alt="" />
      </div>
    );
  }

  return (
    <div
      ref={chatWindowRef}
      style={{ position: 'relative', height: '100vh' }} // Adjust the height here
      className="w-full flex flex-col bg-backgroundColor relative text-primaryTextColor justify-between"
    >
      <MemoizedNavbar
        visibleBackArrow={visibleBackArrow}
        setShowChatWindow={setShowChatWindow}
        setShowUserDetails={setShowUserDetails}
        handleFullScreen={handleFullScreen}
        handleExitFullScreen={handleExitFullScreen}
        isFullScreen={isFullScreen}
        chatWindowInfo={{
          ...chatWindowInfo.userInfo,
          typingStatus: chatWindowInfo.typingStatus,
          chatId: chatWindowInfo.activeChatId,
        }}
      />
      <div
        style={{
          backgroundColor: themeBackgroundColor,
        }}
        className="px-4 py-2 text-primaryTextColor h-full"
      >
        <Messages theme={theme} />
        <MessageDropdown />
      </div>
      <MessageInput />
      <About showUserDetails={showUserDetails} setShowUserDetails={setShowUserDetails} chatWindowInfo={chatWindowInfo} />
    </div>
  );
}

const Navbar = ({ visibleBackArrow, setShowUserDetails, handleFullScreen, handleExitFullScreen, isFullScreen, chatWindowInfo }) => {
  const [typingStatus, setTypingStatus] = useState(false);

  const chats = useSelector(state => state.chats.chats);

  useEffect(() => {
    if (chats && chatWindowInfo) {
      const chatDetails = chats.find((chat) => chat.chatId === chatWindowInfo.chatId);
      if (chatDetails) {
        setTypingStatus(chatDetails.typingStatus.includes(chatDetails.friendInfo.id));
      }
    }
  }, [chats, chatWindowInfo]);

  const imageUrl = chatWindowInfo.user_profile_view && chatWindowInfo.profile_picture_url;
  const name = chatWindowInfo.full_name;
  const userName = chatWindowInfo.username;

  return (
    <nav className="w-full navbar h-16 flex-shrink-0 absolute top-0 left-0 flex items-center justify-between px-4 bg-backgroundColor text-primaryTextColor">
      <div className="flex items-center gap-2">
        {visibleBackArrow && <GoBackSvg />}
        <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden bg-blue-gray-300">
          <img src={imageUrl} alt="Profile Picture" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-medium text-primaryTextColor flex items-center gap-2 text-sm">{name}</div>
          <div className="text-primaryTextColor text-xs">{userName}</div>
          <div className="text-green-500 text-xs h-2">{typingStatus ? 'Typing...' : ''}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CiVideoOn className="sm:text-xl cursor-pointer" />
        <BsExclamationCircle onClick={() => setShowUserDetails(true)} className="sm:text-xl cursor-pointer" />
        {isFullScreen ? <MdFullscreenExit onClick={handleExitFullScreen} className="text-2xl cursor-pointer" /> : <AiOutlineFullscreen onClick={handleFullScreen} className="sm:text-xl cursor-pointer" />}
      </div>
    </nav>
  );
};



const MemoizedNavbar = React.memo(Navbar);

const GoBackSvg = () => {
  const dispatch = useDispatch();

  const handleBackClick = useCallback(() => {
    dispatch(setShowChatWindow(false));
  }, [dispatch]);

  return (
    <div onClick={handleBackClick} className="w-6 h-6 cursor-pointer">
      <IoReturnUpBack />
    </div>
  );
};

export default ChatWindow;
