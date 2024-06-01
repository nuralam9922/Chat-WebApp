/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { HiPlus } from 'react-icons/hi'; // Import the icon you want to use
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setMessages } from '../../slices/chatWindowSlice';
import { setPosition, setShowMessageDropdown } from '../../slices/messageDropdown';
import { formatTime } from '../../utils/formatTime';
import { MessageDropdown } from '../index';


function Messages({ theme }) {
    const messages = useSelector((state) => state.chatWindowInfo.messages);
    const chatId = useSelector((state) => state.chatWindowInfo.activeChatId);
    const dispatch = useDispatch();
    const user = useSelector(selectUserDetails);

    const messageSectionRef = useRef(null);

    useEffect(() => {
        if (chatId) {
            messageService.getMessages(chatId, (messages) => {
                dispatch(setMessages(messages));
            });
        }
    }, [chatId]);

    useEffect(() => {
        if (messageSectionRef.current) {
            messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
        }
    }, [chatId, messages]);

    return (
        <div
            ref={messageSectionRef}
            className="w-full text-primaryTextColor mt-14 overflow-y-scroll relative"
            style={{
                maxHeight: `calc(100vh - 140px)`
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
            <PlusIcon />
            {/* <MessageDropdown /> */}
        </div>
    );
}

const MessageBubble = ({ message, theme }) => {
    const messageClass = `min-w-40 max-w-72 sm:max-w-80 md:max-w-md  text-wrap p-2 mb-2 rounded-md ${theme.theme === 'light' ? 'bg-[#accca4] text-black ' : 'bg-[#23262b] text-white '
        } text-xs sm:text-sm md:text-base`;

    const [hovered, setHovered] = useState(false);

    const timeoutRef = useRef(null);

    const handelHover = () => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setHovered(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setHovered(false);
    };



    return (
        <div onMouseLeave={handleMouseLeave} className='flex justify-end pl-10 relative' >
            <div onMouseOver={handelHover} className={`${messageClass} break-all bg-opacity-80 font-thin  group relative`}>
                <p style={{ hyphens: 'auto', wordBreak: 'break-word' }}>{message.message}</p>
                <div className='w-fll flex items-center justify-between text-[10px]'>
                    <h1 className='mt-2  flex items-center justify-between'>{formatTime(message.created_at)} </h1>
                    {message.seen ? <p className='text-green-500'>&#10003; &#10003;</p> : <p className='text-gray-600'>&#10003;</p>}
                </div>
                <div className='lg:block hidden'>  <PlusIcon hovered={hovered} /></div>
            </div>

        </div>
    );
};

const PlusIcon = ({ hovered }) => {
    const dispatch = useDispatch();
    const iconRef = useRef(null);

    const handelShowMessageDropdown = () => {

        const { left, bottom } = iconRef.current.getBoundingClientRect();
        dispatch(setPosition({ left, bottom }));
        dispatch(setShowMessageDropdown(true));
    };


    return (
        <div
            ref={iconRef}
            onClick={handelShowMessageDropdown}
            className={`absolute bottom-0 -left-10 flex items-center justify-center    rounded-full text-primaryTextColor  size-8 ${hovered ? 'scale-100' : 'scale-0'} duration-300 cursor-pointer border`}
        >
            <HiPlus className="text-primaryTextColor" />
        </div>
    );
};

export default Messages;
