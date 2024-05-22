import { Checkbox } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';

function ProfilePhotoSetting({ currentPrivacySetting, setCurrentPrivacySetting }) {
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleCheckboxChange = option => {
      setSelectedOption(option);
    };
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${
        currentPrivacySetting === 'Profile Photo' ? 'translate-x-0' : 'translate-x-full'
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
          <Checkbox label="Everyone" name="profilePhoto" checked={selectedOption === 'option1'} onChange={() => handleCheckboxChange('option1')} />
        </div>

        <div className="w-full border-b-2">
          <Checkbox label="Nobody" name="profilePhoto" checked={selectedOption === 'option3'} onChange={() => handleCheckboxChange('option3')} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoSetting;
