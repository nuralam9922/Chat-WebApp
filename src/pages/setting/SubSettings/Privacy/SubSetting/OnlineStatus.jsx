import { Checkbox } from '@material-tailwind/react';
import React, { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { HiStatusOnline } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../../../selectors/userSelector';
import { setAlert } from '../../../../../slices/alertSlice';
import { useDispatch } from 'react-redux';
import userService from '../../../../../services/userService';
import { updateUserDetails } from '../../../../../slices/authSlice';

function OnlineStatus({ currentPrivacySetting, setCurrentPrivacySetting }) {

    const user = useSelector(selectUserDetails);
    const [selectedOption, setSelectedOption] = useState(user.settings.online_status_view || 'everyone');
   
    const dispatch = useDispatch();
    const handelShowAlert = () => {
        dispatch(setAlert({ open: true, type: 'success', icon: <HiStatusOnline />, content: 'last seen update successfully!!' }))
    };


    const handleCheckboxChange = async option => {
        try {
            const response = await userService.updateUserDetails(user.id, { settings: { online_status_view: option == 'everyone' ? 'everyone' : 'nobody' } });
            if (response) {
                dispatch(updateUserDetails({ settings: { ...user.settings, online_status_view: option == 'everyone' ? 'everyone' : 'nobody' } }))
                handelShowAlert();
                setSelectedOption(option);
            }
        } catch (error) {
            console.log('Error updating user details about online status change:', error);
        }
    };
  return (
      <div
          className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${currentPrivacySetting === 'Online Status' ? 'flex' : 'hidden'
              }`}
      >      <div className="w-full flex items-center justify-between">
              <div onClick={() => setCurrentPrivacySetting('')}>
                  <BiLeftArrowAlt className="text-3xl cursor-pointer" />
              </div>
              <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2">
                  <p>Online Status</p>
              </h1>
          </div>
      
          <p className="text-linkColor text-xs mt-5">Choose who can see your Online status.</p>

          <div className="w-full mt-10 flex flex-col gap-3">
              <div className="w-full border-b-2">
                  <Checkbox label="Everyone" name="about" checked={selectedOption === 'everyone'} onChange={() => handleCheckboxChange('everyone')} />
              </div>

              <div className="w-full border-b-2">
                  <Checkbox label="Nobody" name="about" checked={selectedOption === 'nobody'} onChange={() => handleCheckboxChange('nobody')} />
              </div>
          </div>
      </div>
  )
}

export default OnlineStatus