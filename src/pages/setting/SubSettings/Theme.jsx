import { Checkbox } from '@material-tailwind/react';
import React, { useState } from 'react';
import { BiEdit, BiLeftArrowAlt } from 'react-icons/bi';
import { FaThemeco } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import AlertComponent from '../../../components/AlertComponent';
import { selectUserDetails } from '../../../selectors/userSelector';
import userService from '../../../services/userService';
import { setTheme } from '../../../slices/useThemeSlice';
import { setAlert } from '../../../slices/alertSlice';

function Theme({ currentSetting, setCurrentSetting }) {
  const user = useSelector(selectUserDetails);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedOption, setSelectedOption] = useState(user.preferences.theme);
  const dispatch = useDispatch();
 
 
  const handelShowAlert = () => {
    dispatch(setAlert({ open: true, type: 'success', icon: <BiEdit />, content: 'theme update successfully!!' }))
  };
 
  const handleCheckboxChange = async option => {
    const updatedObject = { preferences: { theme: option } }

    try {
      setSelectedOption(option);
      const respond = userService.updateUserDetails(user.id, updatedObject);
    if (respond) {
      dispatch(setTheme(option))
      handelShowAlert();
    }
    } catch (error) {
      console.log('Error updating user details:', error);
    }

  };

  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${currentSetting === 'Theme' ? 'flex' : 'hidden'
        }`}
    >

      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2   ">
          <p>Theme</p>
        </h1>
      </div>

      <div className="w-full mt-10 flex flex-col gap-3">
        <div className="w-full border-b-2">
          <Checkbox label="Dark" checked={selectedOption === 'dark'} onChange={() => handleCheckboxChange('dark')} />
        </div>

        <div className="w-full border-b-2">
          <Checkbox label="Light" checked={selectedOption === 'light'} onChange={() => handleCheckboxChange('light')} />
        </div>
        <div className="w-full border-b-2">
          <Checkbox label="Default" checked={selectedOption === 'default'} onChange={() => handleCheckboxChange('default')} />
        </div>
      </div>
    </div>
  );
}

export default Theme