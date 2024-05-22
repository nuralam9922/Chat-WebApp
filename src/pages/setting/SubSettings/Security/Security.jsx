import React from 'react';
import { BiLeftArrowAlt, BiLockAlt, BiMessageAdd, BiMessageAltAdd } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { GrDocumentCloud, GrStatusGood } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';

function Security({ currentSetting, setCurrentSetting }) {
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${
        currentSetting === 'Security' ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2   ">
          <MdSecurity />
          <p>Security</p>
        </h1>
      </div>

      <div className="w-full mt-5 lg:mt-20   flex justify-center items-center ">
        <div className="size-32 rounded-full bg-blue-500 flex items-center justify-center">
          <BiLockAlt className="text-3xl text-white" />
        </div>
      </div>
      <div className="w-full mt-5">
        <h1 className="font-[600] mb-2 text-secondaryTextColor">Your Chats and calls are private</h1>
        <p className="text-xs text-secondaryTextColor">
          End-to-end encryption keeps your personal messages & call between you and person you choose to communicate with. Not even talk can read or listen to them. This includes
          your
        </p>
      </div>

      <div className="w-full mt-4 text-secondaryTextColor flex flex-col gap-5">
        <p className="font-[400] flex items-center gap-5">
          <BiMessageAltAdd /> Text and voice messages
        </p>
        <p className="font-[400] flex items-center gap-5">
          <IoCallOutline />
          Audio & Video Calls
        </p>
        <p className="font-[400] flex items-center gap-5">
          <GrDocumentCloud />
          Photos, videos & documents
        </p>
        <p className="font-[400] flex items-center gap-5">
          <CiLocationOn />
          Location Sharing
        </p>
        <p className="font-[400] flex items-center gap-5">
          <GrStatusGood />
          Status Updates
        </p>
      </div>
    </div>
  );
}

export default Security