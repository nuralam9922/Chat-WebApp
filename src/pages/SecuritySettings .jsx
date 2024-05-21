import React, { useState } from 'react';
import { FaBars, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../slices/toggleSidebarSlice';

const SecuritySettings = () => {
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [pinAskTime, setPinAskTime] = useState(0);
  const [isProfilePictureVisible, setIsProfilePictureVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isFriendRequestEnabled, setIsFriendRequestEnabled] = useState(false);

  const dispatch = useDispatch();

  const handlePinToggle = () => {
    setIsPinEnabled(!isPinEnabled);
  };

  const handlePinAskTimeChange = e => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPinAskTime(value);
    }
  };

  const handleProfilePictureVisibilityToggle = () => {
    setIsProfilePictureVisible(!isProfilePictureVisible);
  };

  const handleProfileVisibilityToggle = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleFriendRequestToggle = () => {
    setIsFriendRequestEnabled(!isFriendRequestEnabled);
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="w-full  p-6 border-l rounded-lg ">
      <button onClick={handleToggleSidebar} className="text-gray-600 focus:outline-none mr-4 pb-5">
        <FaBars />
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Security Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaLock className="text-gray-600 mr-2" />
          <label className="text-gray-700 font-semibold">Enable PIN System</label>
          <input type="checkbox" checked={isPinEnabled} onChange={handlePinToggle} className="ml-auto form-checkbox h-5 w-5 text-indigo-600" />
        </div>
        {isPinEnabled && (
          <div className="flex items-center">
            <label className="text-gray-700 font-semibold">PIN Ask Time (in minutes):</label>
            <input type="number" value={pinAskTime} onChange={handlePinAskTimeChange} className="ml-auto form-input rounded-md  focus:border-indigo-600 border-gray-300 border p-2 w-32 outline-none appearance-none text-secondaryTextColor" />
          </div>
        )}
        <div className="flex items-center">
          <FaLock className="text-gray-600 mr-2" />
          <label className="text-gray-700 font-semibold">Profile Picture Visibility</label>
          <input type="checkbox" checked={isProfilePictureVisible} onChange={handleProfilePictureVisibilityToggle} className="ml-auto form-checkbox h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex items-center">
          <FaLock className="text-gray-600 mr-2" />
          <label className="text-gray-700 font-semibold">Profile Visibility</label>
          <input type="checkbox" checked={isProfileVisible} onChange={handleProfileVisibilityToggle} className="ml-auto form-checkbox h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex items-center">
          <FaLock className="text-gray-600 mr-2" />
          <label className="text-gray-700 font-semibold">Friend Request Settings</label>
          <input type="checkbox" checked={isFriendRequestEnabled} onChange={handleFriendRequestToggle} className="ml-auto form-checkbox h-5 w-5 text-indigo-600" />
        </div>
        <div className="flex justify-end">
          <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
