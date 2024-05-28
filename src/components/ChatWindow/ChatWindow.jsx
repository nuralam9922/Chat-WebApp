import React, { useEffect, useRef, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { CiVideoOn } from 'react-icons/ci';
import { IoReturnUpBack } from 'react-icons/io5';
import userImage from '../../assets/userImage.png';
import About from '../../pages/About/About';
import MessageInput from '../MessageInput/MessageInput';
import './chatWindow.css'
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../selectors/userSelector';

const messages = [
  { text: 'Hey there! How can I help you today?', time: '10:05', isCurrentUser: false },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  { text: "Sure, I'm looking for some information on your products.", time: '10:05', isCurrentUser: true, isRead: true },
  // Add more messages as needed
];

function ChatWindow({ visibleBackArrow = false, setShowChatWindow }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const messageSectionRef = useRef(null);
  const theme = useSelector(state => state.theme);
  const user = useSelector(selectUserDetails)

  useEffect(() => {
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative ',
      }}
      className="w-full  flex flex-col  bg-backgroundColor relative text-primaryTextColor overflow-y-scroll h-screen"
    >
      <Navbar visibleBackArrow={visibleBackArrow} setShowChatWindow={setShowChatWindow} setShowUserDetails={setShowUserDetails} />{' '}
      <div style={{
        backgroundColor: theme.theme === 'dark' ? '#181818' : theme.background || '#D9D9D9',
      }} ref={messageSectionRef} className="overflow-y-auto flex-grow px-4 py-2">
        {messages.map((item, index) => (
          <div key={index} className={`w-full flex ${item.isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div
              style={{
                backgroundColor: theme.theme === 'light'
                  ? (item.isCurrentUser ? '#dadada' : '#dadada')
                  : '#212121', // Default dark theme background
                color: theme.theme === 'light' ? 'black' : 'white',
              }}
              className={`max-w-md p-2 text-xs md:p-3 rounded-lg  text-primaryTextColor`}
            >
              {item.text}
              <div className="flex items-center justify-end mt-1">
                <span className="block text-xs text-gray-600">{item.time}</span>
                {item.isCurrentUser && item.isRead && <span className="text-xs text-green-500 ml-2">&#10003;</span>}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="w-full flex justify-start mb-2">
            <div className="max-w-xs p-3 rounded-lg bg-gray-200 text-gray-900">
              <div className="flex items-center">
                <div className="animate-pulse">
                  <span className="block h-2 w-2 bg-gray-700 rounded-full mr-1"></span>
                  <span className="block h-2 w-2 bg-gray-700 rounded-full mr-1"></span>
                  <span className="block h-2 w-2 bg-gray-700 rounded-full"></span>
                </div>
                <span className="ml-2 text-sm">Typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <MessageInput />
      <About showUserDetails={showUserDetails} setShowUserDetails={setShowUserDetails} />
    </div>
  );
}
export const Navbar = ({ visibleBackArrow, setShowChatWindow, setShowUserDetails }) => {
  return (
    <nav className="w-full navbar h-[71px]  flex-shrink-0   top-0 flex items-center justify-between px-4 bg-backgroundColor   text-primaryTextColor">
      <div className="flex items-center gap-4">
        {/* make a go back arrow */}
        {visibleBackArrow && <GoBackSvg setShowChatWindow={setShowChatWindow} />}

        <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
          <img src={userImage} className="w-full h-full object-cover " alt="User Avatar" />
        </div>
        <div>
          <div className="font-medium text-primaryTextColor">Nuralam Mondal</div>
          <div className="text-green-500 text-xs">ONLINE</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CiVideoOn className="text-xl cursor-pointer" />
        <BsExclamationCircle onClick={() => setShowUserDetails(true)} className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
};
export const GoBackSvg = ({ setShowChatWindow }) => {
  const handleBackClick = () => {
    setShowChatWindow(false);
  };
  return (
    <div onClick={handleBackClick} className="w-6 h-6 cursor-pointer" >
      <IoReturnUpBack />
    </div>
  );
};

export default ChatWindow;
