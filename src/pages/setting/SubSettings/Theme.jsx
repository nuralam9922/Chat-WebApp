import { Checkbox } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../slices/useThemeSlice';

function Theme({ currentSetting, setCurrentSetting }) {


  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('theme') || 'dark');
  const dispatch = useDispatch();

      const handleCheckboxChange = option => {
        setSelectedOption(option);
        dispatch(setTheme(option))

      };

  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${
        currentSetting === 'Theme' ? 'translate-x-0' : 'translate-x-full'
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