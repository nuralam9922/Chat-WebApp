import { Checkbox } from '@material-tailwind/react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';

export const Notifications = ({ currentSetting, setCurrentSetting }) => {
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor shadow-md shadow-white z-[100] p-4 transition-transform duration-300 flex flex-col  ${
        currentSetting === 'Notifications' ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer text-primaryTextColor" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2   ">
          <GrNotification />
          <p>Notifications</p>
        </h1>
      </div>

      <div
        style={{
          borderBottom: '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full   p-2 mt-20 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Notifications</h1>
          <p className="text-xs text-secondaryTextColor mt-2">Show notifications for new messages</p>
        </div>
        <Checkbox color="blue" defaultChecked />
      </div>
      <div
        style={{
          borderBottom: '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full   p-2 mt-5 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Show Previews</h1>
        </div>
        <Checkbox color="blue" defaultChecked />
      </div>
      <div
        style={{
          borderBottom: '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full   p-2 mt-5 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Show Reaction Notifications</h1>
        </div>
        <Checkbox color="blue" defaultChecked />
      </div>
      <div
        style={{
          borderBottom: '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full   p-2 mt-5 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Incoming call ringtone</h1>
        </div>
        <Checkbox color="blue" defaultChecked />
      </div>
      <div
        style={{
          borderBottom: '1px solid rgb(229 231 235 / 17%)',
        }}
        className="w-full   p-2 mt-5 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Sounds</h1>
          <p className="text-xs text-secondaryTextColor mt-2">Play sounds for incoming messages</p>
        </div>
        <Checkbox color="blue" defaultChecked />
      </div>
    </div>
  );
};
