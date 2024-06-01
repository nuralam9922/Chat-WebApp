import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoFilterOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import { selectUserDetails } from '../../selectors/userSelector';
import { setActiveChatId, setShowChatWindow, setUserInfo } from '../../slices/chatWindowSlice';
import { setShowAddNewComponent } from '../../slices/showAddNewComponentSlice';
import ChatWindow from '../ChatWindow/ChatWindow';
import Dropdown from '../Dropdown/Dropdown';
import BottomBarForMobile from '../Sidebar/BottomBarForMobile';
import MessageLabel from './MessageLabel';
import './Messages.css';




function ChatsComponents() {

  // custom hooks
  const [width] = useWindowWidth();
  const mobileMode = width < 768;
  const mdMode = width >= 768 && width < 1024;
  // const [showChatWindow, setShowChatWindow] = useState(false);

  // redux states
  const { theme } = useSelector(state => state.theme)
  const loggedInUser = useSelector(selectUserDetails)
  const { chats, loading, error } = useSelector((state) => state.chats);
  const showChatWindow = useSelector(state => state.chatWindowInfo.showChatWindow);



  // initial variables
  const dispatch = useDispatch();
  // const checkUserAlreadyExist = chats.chats.filter((chat) => chat.friendInfo.id === userInfo.id)

  useEffect(() => {
    // dispatch(setActiveChatId([]));
  }, [chats]);

  const loggedInUserId = loggedInUser.id;


  const handleClick = (chat) => {
    if (mobileMode || mdMode) {
      dispatch(setShowChatWindow(true));
    }

    dispatch(setActiveChatId(chat.chatId))
    dispatch(setUserInfo(chat.friendInfo))

  };



  // useEffect(() => {
    
  // }, [])

  return (
    <>
      <div
        style={{
          display: showChatWindow && (mdMode || mobileMode) ? 'none' : 'flex',
          borderRight: theme === 'light' ? '1px solid #dadada' : '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full h-screen flex flex-col  message-container p-1 px-3 bg-backgroundColor text-primaryTextColor border-none md:border-r-2 select-none"
      >
        <TopSection />


        {error && <p>{error?.message}</p>}

        <div style={{
          display: error ? 'none' : 'flex',
        }} className="w-full mt-5 flex flex-col h-[calc(100% -10rem)]  overflow-y-scroll pb-20 gap-2">
          {loading ? (
            Array(10).fill(10).map((_, index) => (
              <MessageLabelSkeleton key={index} />
            ))
          ) : (
            chats.length > 0 ? (
              chats.map((chat) => (
                <MessageLabel key={chat.chatId} handleClick={handleClick} chat={chat} />
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <h1>No Chats</h1>
              </div>
            )
          )}
        </div>


        <BottomBarForMobile />
      </div>
      {showChatWindow && (mdMode || mobileMode) && <ChatWindow visibleBackArrow={mdMode || mobileMode}  fullScreen={width <= 959} />}
    </>
  );
}

const TopSection = () => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Latest');
  const { theme } = useSelector(state => state.theme)

  const dispatch = useDispatch();

  return (
    <div className="flex-shrink-0 select-none">
      <div className="w-full flex justify-between items-center py-2">
        <h1 className="text-[23px] font-[700]">Chats</h1>
        <div className='flex items-center justify-center gap-3'>
          <div onClick={() => setDropdown(prev => !prev)} className="relative">
            <IoFilterOutline data-tooltip-id="my-tooltip" data-tooltip-content="Filter" className='text-lg cursor-pointer outline-none' />
            <Dropdown options={['Oldest', 'Latest']} isOpen={dropdown} isClose={setDropdown} dropdownValue={dropdownValue} setDropdownValue={setDropdownValue} />
          </div>
          <div>
            <FiEdit onClick={() => dispatch(setShowAddNewComponent(true))} data-tooltip-id="my-tooltip" data-tooltip-content="Add" className='text-lg cursor-pointer outline-none' />
          </div>

        </div>
      </div>


      {/* search bar  */}
      <div className="w-full relative h-[45px]">
        <svg className="absolute top-1/2 left-3 size-[17px] transform -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.8815 10.8817C10.9574 10.8055 11 10.7025 11 10.595C11 10.4875 10.9574 10.3845 10.8815 10.3083L7.96103 7.38889C8.5294 6.69132 8.83911 5.81869 8.83769 4.91889C8.83651 3.8799 8.42325 2.88379 7.68858 2.14912C6.95391 1.41444 5.95782 1.00118 4.91884 1C3.87986 1.00118 2.88377 1.41444 2.1491 2.14912C1.41443 2.88379 1.00118 3.8799 1 4.91889C1.00118 5.95788 1.41443 6.95398 2.1491 7.68866C2.88377 8.42334 3.87986 8.8366 4.91884 8.83778C5.81864 8.8392 6.69125 8.52948 7.38881 7.96111L10.3093 10.8817C10.3851 10.9573 10.4878 10.9999 10.5949 11C10.6481 11.0001 10.7008 10.9897 10.75 10.9694C10.7992 10.9491 10.8439 10.9193 10.8815 10.8817ZM8.02714 4.91889C8.02626 5.74285 7.69855 6.53281 7.11593 7.11544C6.5333 7.69807 5.74335 8.02578 4.9194 8.02667C4.09535 8.02593 3.30525 7.69829 2.72251 7.11564C2.13977 6.53299 1.81198 5.74295 1.8111 4.91889C1.81198 4.09493 2.13969 3.30496 2.72231 2.72233C3.30494 2.1397 4.09489 1.81199 4.91884 1.81111C5.74289 1.81185 6.53299 2.13949 7.11573 2.72214C7.69848 3.30478 8.02626 4.09483 8.02714 4.91889Z"
            fill="#676767"
            stroke="#676767"
            strokeWidth="0.5"
          />
        </svg>

        <input
          style={{
            backgroundColor: theme === 'light' ? '#EFEFEF' : '#212121',
          }}
          type="search"
          className="w-full  h-full rounded-[12px] indent-10 outline-none focus:border focus:border-blue-400 duration-200 appearance-none"
          placeholder="Search..."
          name=""
          id=""
        />
      </div>

    </div>
  );
};



const MessageLabelSkeleton = () => (
  <div className="min-h-[36px] flex-shrink-0 py-3 md:px-5 rounded-md bg-backgroundColor animate-pulse w-full flex items-center justify-between cursor-pointer">
    <div className="flex items-start gap-4 ">
      <div className="userAvatar size-14 bg-gray-300 rounded-full h-10 w-10"></div>
      <div className="flex flex-col gap-2">
        <div className="userName bg-gray-300 rounded h-4 w-24"></div>
        <div className="minMessagePreview bg-gray-300 rounded h-3 w-32"></div>
      </div>
    </div>
    <div className="h-full flex flex-col items-end justify-between">
      <div className="bg-gray-300 rounded h-3 w-16"></div>
      <div className="bg-gray-300 rounded-full h-5 w-5 mt-2"></div>
    </div>
  </div>
);






export default ChatsComponents;
