/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { BsCopy, BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setMessages } from '../../slices/chatWindowSlice';
import { formatTime } from '../../utils/formatTime';
import Copy from '../Copy';

function Messages({ theme }) {
    const messages = useSelector((state) => state.chatWindowInfo.messages);
    const chatId = useSelector((state) => state.chatWindowInfo.activeChatId);
    const dispatch = useDispatch();
    const user = useSelector(selectUserDetails);

    const messageSectionRef = useRef(null);

    useEffect(() => {
        messageService.getMessages(chatId, (messages) => {
            dispatch(setMessages(messages));
        });
    }, [chatId]);

    useEffect(() => {
        if (messageSectionRef.current) {
            messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
        }
    }, [chatId, messages]);

    return (
        <div
            ref={messageSectionRef}
            className="w-full text-primaryTextColor mt-14 overflow-y-scroll "
            style={{
                maxHeight: `calc(100vh - 140px)` // Adjust as needed based on your design
            }}
        >
            <h1 className='text-center text-lg font-bold mb-4 mt-10'>Welcome to the Chat</h1>
            {messages.length > 0 &&
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-full flex relative group  ${message.sender_id === user.id ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <MessageBubble message={message} theme={theme} />
                    </div>
                ))}
        </div>
    );
}

const MessageBubble = ({ message, theme }) => {
    const messageClass = `min-w-40 max-w-72 sm:max-w-80 md:max-w-md  text-wrap p-2 mb-2 rounded-md ${theme.theme === 'light' ? 'bg-[#accca4] text-black ' : 'bg-[#23262b] text-white '
        } text-xs sm:text-sm md:text-base`;

    return (
        <div className={`${messageClass} break-all bg-opacity-80 font-thin relative group`}>
            <p style={{ hyphens: 'auto', wordBreak: 'break-word' }}>{message.message}</p>
            <h1 className='mt-2 text-[10px] flex items-center justify-between'>{formatTime(message.created_at)}  <span className='cursor-pointer group-hover:opacity-100 opacity-0 duration-300'><Copy text={message.message} /></span></h1>

        </div>
    );
};

export default Messages;
