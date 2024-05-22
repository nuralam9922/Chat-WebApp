import React, { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Checkbox } from '@material-tailwind/react';

function LastSeen({ currentPrivacySetting, setCurrentPrivacySetting }) {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleCheckboxChange = option => {
    setSelectedOption(option);
  };

  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${
        currentPrivacySetting === 'Last Seen' ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentPrivacySetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2">
          <p>Last Seen</p>
        </h1>
      </div>

      <p className="text-linkColor text-xs mt-5">If you don’t share your Last Seen, you won’t be able to see other people’s Last Seen</p>

      <div className="w-full mt-10 flex flex-col gap-3">
        <div className="w-full border-b-2">
          <Checkbox label="Everyone" name="lastSeen" checked={selectedOption === 'option1'} onChange={() => handleCheckboxChange('option1')} />
        </div>

        <div className="w-full border-b-2">
          <Checkbox label="Nobody" name="lastSeen" checked={selectedOption === 'option3'} onChange={() => handleCheckboxChange('option3')} />
        </div>
      </div>
    </div>
  );
}

export default LastSeen;
