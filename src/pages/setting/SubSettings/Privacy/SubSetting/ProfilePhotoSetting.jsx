import { Checkbox } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { selectUserDetails } from '../../../../../selectors/userSelector';
import { useSelector } from 'react-redux';
import userService from '../../../../../services/userService';
import { updateUserDetails } from '../../../../../slices/authSlice';
import { setAlert } from '../../../../../slices/alertSlice';
import { RiProfileLine } from 'react-icons/ri';

function ProfilePhotoSetting({ currentPrivacySetting, setCurrentPrivacySetting }) {
  const user = useSelector(selectUserDetails);
  const [selectedOption, setSelectedOption] = useState(user.settings.user_profile_view || 'everyone');
  const dispatch = useDispatch();

  const handelShowAlert = () => {
    dispatch(setAlert({ open: true, type: 'success', icon: <RiProfileLine />, content: 'last seen update successfully!!' }))
  };


  const handleCheckboxChange = async option => {
    const updatedObject = { settings: { ...user.settings, user_profile_view: option == 'everyone' ? 'everyone' : 'noBody' } }
    try {
      const response = await userService.updateUserDetails(user.id, updatedObject);
      if (response) {
        dispatch(updateUserDetails(updatedObject))
        handelShowAlert();
      }
      setSelectedOption(option);
    } catch (error) {
      console.log('Error updating user details in profile photo setting:', error);
    }
  };
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${currentPrivacySetting === 'Profile Photo' ? 'flex' : 'hidden'
        }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentPrivacySetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2">
          <p>Profile Photo</p>
        </h1>
      </div>

      <p className="text-linkColor text-xs mt-5">Choose who can see your profile photo.</p>

      <div className="w-full mt-10 flex flex-col gap-3">
        <div className="w-full border-b-2">
          <Checkbox label="Everyone" name="profilePhoto" checked={selectedOption === 'everyone'} onChange={() => handleCheckboxChange('everyone')} />
        </div>

        <div className="w-full border-b-2">
          <Checkbox label="Nobody" name="profilePhoto" checked={selectedOption === 'noBody'} onChange={() => handleCheckboxChange('noBody')} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoSetting;
