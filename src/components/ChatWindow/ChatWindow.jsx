import React, { useState } from 'react';
import aboutIcon from '../../assets/about.svg';
import userImage from '../../assets/userImage.png';
import videoCallIcon from '../../assets/video.svg';
import About from '../../pages/About/About';
import MessageInput from '../MessageInput/MessageInput';
import { useRef } from 'react';
import { useEffect } from 'react';
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
      className="w-full  flex flex-col gap-2 bg-backgroundColor relative border-gray-200 overflow-y-scroll h-screen"
    >
      <Navbar visibleBackArrow={visibleBackArrow} setShowChatWindow={setShowChatWindow} setShowUserDetails={setShowUserDetails} />{' '}
      <div ref={messageSectionRef} className="overflow-y-auto flex-grow px-4 py-2">
        {messages.map((item, index) => (
          <div key={index} className={`w-full flex ${item.isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`max-w-xs p-2 text-xs md:p-3 rounded-lg bg-gray-200 text-gray-900`}>
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
    <nav className="w-full h-[71px] sticky flex-shrink-0 border  top-0 flex items-center justify-between px-4 bg-backgroundColor border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        {/* make a go back arrow */}
        {visibleBackArrow && <GoBackSvg setShowChatWindow={setShowChatWindow} />}

        <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden">
          <img src={userImage} className="w-full h-full object-cover" alt="User Avatar" />
        </div>
        <div>
          <div className="font-medium text-gray-900">Nuralam Mondal</div>
          <div className="text-green-500 text-xs">ONLINE</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src={videoCallIcon} alt="Video Call" className="w-6 h-6 cursor-pointer" />
        <img onClick={() => setShowUserDetails(true)} src={aboutIcon} alt="About" className="w-6 h-6 cursor-pointer" />
      </div>
    </nav>
  );
};
export const GoBackSvg = ({ setShowChatWindow }) => {
  const handleBackClick = () => {
    setShowChatWindow(false);
  };
  return (
    <div>
      <svg
        onClick={handleBackClick}
        className="w-[18px] h-[18px] cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </div>
  );
};

export default ChatWindow;
