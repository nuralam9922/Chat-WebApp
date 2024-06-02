/* eslint-disable react/prop-types */
import { selectUserDetails } from "../../selectors/userSelector";
import { formatTime } from "../../utils/formatTime";
import ImageComponent from "../ImageComponent";
import { useState } from "react";
import { useSelector } from "react-redux";

const MessageLabel = ({ handleClick, chat }) => {

    // Setting variables for easy access
    const imageUr = chat.friendInfo.user_profile_view === 'everyone' && chat.friendInfo.profile_picture_url;
    const name = chat.friendInfo.full_name;
    const userName = chat.friendInfo.username;

    // Redux states
    const activeChatId = useSelector((state) => state.chatWindowInfo.activeChatId);
    const theme = useSelector((state) => state.theme.theme);
    const loggedInUser = useSelector(selectUserDetails);

    // Conditional classes based on the theme
    const backgroundColor = theme === 'dark' ? 'bg-transparent' : 'bg-white';
    const hoverColor = theme === 'dark' ? 'lg:hover:bg-gray-700' : 'hover:bg-stone-200';
    const activeBackgroundColor = theme === 'dark' ? 'lg:bg-gray-900' : 'lg:bg-blue-gray-100';
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const secondaryTextColor = theme === 'dark' ? 'text-gray-400' : 'text-secondaryTextColor';


    return (
        <div
            onClick={() => handleClick(chat)}
            className={`min-h-[36px] flex-shrink-0 py-3 md:px-2 rounded-md ${activeChatId === chat.chatId ? activeBackgroundColor : backgroundColor} ${theme === 'light' ? hoverColor : ''} duration-300 w-full flex items-center justify-between cursor-pointer`}
        >
            <div className="flex items-start gap-4">
                <div className="userAvatar size-10 sm:size-16 flex-shrink-0">
                    <ImageComponent imageUrl={imageUr} className={'w-full h-full rounded-full object-cover'} />
                </div>
                <div>
                    <div className={`userName font-[700] ${textColor}`}>{name}</div>
                    {/* <div className={`userName font-[300] text-xs ${secondaryTextColor}`}>{userName}</div> */}
                    <div className={`minMessagePreview ${secondaryTextColor} text-xs`}>
                        <span>  {chat.last_message.length > 20 ? chat.last_message.slice(0, 25) + '...' : chat.last_message}</span>
                    </div>
                    
                </div>
            </div>
            <div className="h-full flex flex-col items-end justify-between flex-shrink-0">
                <p className={`text-xs md:text-base ${secondaryTextColor}`}>{formatTime(chat.last_message_timestamp)}</p>
                <img
                    style={{
                        display: 'none',
                    }}
                    alt=""
                />
                {chat.unreadCount > 1 && (
                    <div className="size-[20px] w-auto p-1 rounded-full bg-green-600 flex items-center justify-center text-white ">
                        {chat.unreadCount}
                     
                    </div>
                )}
                <span
                    className="isTyping text-green-500"
                >
                    {chat.typingStatus.includes(chat.friendInfo?.id) && 'Typing...'}
                </span>
            </div>
        </div>
    );
};

export default MessageLabel;
