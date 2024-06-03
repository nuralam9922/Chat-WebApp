/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setMessages } from '../../slices/chatWindowSlice';
import { setMessageDetails, setMessageDetailsDropdownPosition, setShowMessageDropdown } from '../../slices/messageDropdown';
import { formatTime } from '../../utils/formatTime';

const Messages = memo(({ theme }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserDetails);
    const messages = useSelector((state) => state.chatWindowInfo.messages);
    const chatId = useSelector((state) => state.chatWindowInfo.activeChatId);
    const friendId = useSelector((state) => state.chatWindowInfo.userInfo.id);
    const messageSectionRef = useRef(null);

    useEffect(() => {
        if (chatId) {
            messageService.getMessages(user.id, chatId, (receivedMessages) => {
                dispatch(setMessages(receivedMessages));
            });
        }
    }, [chatId, dispatch, user.id]);

    useEffect(() => {
        if (messageSectionRef.current) {
            messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
        }
    }, [messages, friendId]);

    useEffect(() => {
        const handleResize = () => {
            if (messageSectionRef.current) {
                messageSectionRef.current.style.maxHeight = `${window.innerHeight - 140}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the correct height

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={messageSectionRef} className="w-full text-primaryTextColor mt-14 overflow-y-scroll relative" style={{ maxHeight: `calc(100vh - 140px)` }}>
            <h1 className='text-center text-lg font-bold mb-4 mt-10'>Welcome to the Chat</h1>
            {messages.length > 0 && messages.map((message, index) => (
                <div key={index} className={`w-full flex relative group ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                    <MessageBubble message={message} theme={theme} />
                </div>
            ))}
        </div>
    );
});

const MessageBubble = memo(({ message, theme }) => {
    const [hovered, setHovered] = useState(false);
    const timeoutRef = useRef(null);
    const messageRef = useRef(null);
    const loggedInUser = useSelector(selectUserDetails);
    const chatId = useSelector((state) => state.chatWindowInfo.activeChatId);

    const dispatch = useDispatch();

    const handleHover = useCallback(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setHovered(true);
        }, 500);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setHovered(false);
    }, []);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && message.sender_id !== loggedInUser.id && message.seen.length === 1) {
                    messageService.seenSingeMessage(loggedInUser.id, chatId, message.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
        });

        if (messageRef.current) {
            observer.observe(messageRef.current);
        }

        return () => {
            if (messageRef.current) {
                observer.unobserve(messageRef.current);
            }
        };
    }, [chatId, loggedInUser.id, message]);

    const seen = message.seen.length >= 2;

    const touchedTimeoutRef = useRef(null);
    let executeFun = false;
    const handelStartPress = () => {
        clearTimeout(touchedTimeoutRef.current);

        touchedTimeoutRef.current = setTimeout(() => {
            executeFun = true;
        }, 500);
    }

    const handelEndPress = () => {
        clearTimeout(touchedTimeoutRef.current);
        if (executeFun) {
            dispatch(setShowMessageDropdown(true));
            dispatch(setMessageDetails(message));
            //    console.log(e);
        }
    }

    return (
        <div
            ref={messageRef}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handelStartPress}
            onTouchEnd={handelEndPress}
            className={`flex justify-end ${loggedInUser.id === message.sender_id ? 'pl-10' : 'pr-10'} relative`}
        >
            <div
                onMouseOver={handleHover}
                className={`text-xs ${message.deletedForEveryone ? 'bg-red-400 text-white' : theme.theme === 'light' ? 'bg-[#accca4] text-black' : 'bg-[#23262b] text-white'} min-w-40 max-w-72 sm:max-w-80 md:max-w-md text-wrap p-2 mb-2 rounded-md text-lg sm:text-sm md:text-base break-all bg-opacity-80 font-thin group relative`}
            >
                {message.deletedForEveryone ? (
                    <div className='flex items-center'>
                        <FaExclamationCircle className='mr-2' />
                        <p className={'md:text-xl'} style={{ hyphens: 'auto', wordBreak: 'break-word' }}>This message was deleted</p>
                    </div>
                ) : (
                    <p className={'md:text-xl'} style={{ hyphens: 'auto', wordBreak: 'break-word' }}>{message.message}</p>
                )}
                <div className='w-full flex items-center justify-between  '>
                    <h1 className='mt-2 flex items-center justify-between w-full text-xs md:text-base'>
                        <span>{formatTime(message.created_at)}</span>
                        <span style={{
                            display: !message?.deletedForEveryone ? 'block' : 'none'
                        }}>
                            {Object.entries(message.reactions).map(([userId, emojis]) => (
                                <span key={userId}>
                                    {emojis}
                                </span>
                            ))}
                        </span>
                    </h1>

                </div>
                <div className='w-full text-right' style={{ display: message.sender_id === loggedInUser.id && !message?.deletedForEveryone ? 'block' : 'none' }}>
                    {seen ? (
                        <p className='text-green-800'>&#10003;&#10003;</p>
                    ) : (
                        <p className='text-gray-600'>&#10003;</p>
                    )}
                </div>
                <div className='lg:block hidden'>
                    <PlusIcon message={message} hovered={hovered} loggedInUser={loggedInUser} />
                </div>
            </div>
        </div>
    );
});

const PlusIcon = memo(({ hovered, message, loggedInUser }) => {
    const dispatch = useDispatch();
    const iconRef = useRef(null);

    const handelShowMessageDropdown = useCallback((e) => {
        dispatch(setShowMessageDropdown(true));
        dispatch(setMessageDetails(message));

        const x = e.clientX;
        const y = e.clientY;

        dispatch(setMessageDetailsDropdownPosition({ x, y }));
    }, [dispatch, message]);

    return (
        <div ref={iconRef} onClick={handelShowMessageDropdown} className={`absolute bottom-0 ${message?.sender_id === loggedInUser.id ? '-left-10' : '-right-10'} flex items-center justify-center rounded-full text-primaryTextColor size-8 ${hovered ? 'scale-100' : 'scale-0'} duration-300 cursor-pointer border`}>
            <HiPlus className="text-primaryTextColor" />
        </div>
    );
});

export default Messages;
