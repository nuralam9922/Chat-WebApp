import { Button, Input } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import ImageComponent from '../ImageComponent';
import { FiSearch } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserFriends } from '../../selectors/userFriendsSelector';
import { setShowAddNewComponent } from '../../slices/showAddNewComponentSlice';
import { Link } from 'react-router-dom';
import { setUserInfo } from '../../slices/chatWindow';

const AddNewChatComponent = () => {
    const userFriends = useSelector(selectUserFriends);
    const show = useSelector((state) => state.showAddNewComponent.value);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    // Local state to manage scale for animation
    const [scale, setScale] = useState(show ? 'scale-100' : 'scale-150');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                dispatch(setShowAddNewComponent(false));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    // handel scaling for animation
    useEffect(() => {
        // Update the scale state based on `show`
        if (show) {
            setTimeout(() => setScale('scale-100'), 0); // Trigger animation
        } else {
            setScale('scale-105');
        }
    }, [show]);

    const handleAddNewChat = (userInfo) => {
        if (!userInfo) {
            return;
        }
        dispatch(setUserInfo(userInfo));
        dispatch(setShowAddNewComponent(false));
    };

    return (
        <div style={{ display: show ? 'flex' : 'none' }} className="fixed text-primaryTextColor left-0 top-0 bg-black bg-opacity-50 z-[90] w-full h-screen flex items-center justify-center backdrop-blur-sm duration-150">
            {/* Inner main center element */}
            <div ref={containerRef} className={`relative w-full sm:max-w-lg lg:max-w-xl h-full sm:h-[40rem] ${scale} duration-500 bg-backgroundColor sm:rounded-lg p-6 shadow-lg `}>
                <div className='flex items-center justify-between'>
                    <h1 className="text-2xl font-semibold">Add New Chat</h1>
                    <button onClick={() => dispatch(setShowAddNewComponent(false))} className="text-primaryTextColor hover:bg-blue-gray-100 hover:text-black rounded-md p-1">
                        <IoClose size={24} />
                    </button>
                </div>
                <div className="mt-5 flex items-center space-x-2 ">
                    <div className="relative w-full h-10 overflow-hidden bg-transparent">
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full pr-10 rounded-full h-full border border-blue-gray-700 px-8 focus:shadow-outline bg-transparent outline-none focus:border-blue-400"
                        />
                        <div className='absolute rounded-r-full right-0 top-0 h-full w-12 border border-blue-gray-700 flex items-center justify-center cursor-pointer'>
                            <FiSearch className="text-gray-500 text-xs" size={20} />
                        </div>
                    </div>
                </div>
                {/* Users */}

                {userFriends.length === 0 && (
                    <div className="w-full h-full mt-10 flex flex-col gap-4">
                        <h1 className="text-center font-medium">No user found</h1>
                        <Link to={'/friends'} onClick={() => dispatch(setShowAddNewComponent(false))} className=''>
                            <Button color='blue' className="w-full" >Click Here To Add User</Button>
                       </Link>
                    </div>
                )}

                <div className="mt-5 w-full h-[calc(100%-10rem)] overflow-y-auto">
                    {userFriends.map(user => (
                        <div key={user.id} className="w-full min-h-10 border-b py-3 flex items-start justify-between flex-col gap-2 sm:flex-row">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 flex-shrink-0">
                                    <ImageComponent
                                        imageUrl={user.user_profile_view === 'everyone' && user.profile_picture_url.imageUrl}
                                        imageAlt="User"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-sm font-medium">John Doe</h1>
                                    <p className="bio sm:w-60 text-xs text-wrap break-words text-left text-gray-500">
                                        {user.user_bio_view === 'everyone' && user.bio}
                                    </p>
                                </div>
                            </div>
                            <Button color="blue" onClick={() => handleAddNewChat(user)} className="outline-none w-full sm:w-[5rem]">Chat</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddNewChatComponent;
