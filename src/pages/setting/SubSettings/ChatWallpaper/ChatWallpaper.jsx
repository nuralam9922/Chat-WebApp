import { Checkbox } from '@material-tailwind/react';
import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { LuWallpaper } from 'react-icons/lu';

const bg = [
  '#D9D9D9',
  '#000000',
  '#255740',
  '#2A835A',
  '#1C4F6C',
  '#C37F7F',
  '#A49797',
  '#16060B',
  '#3B510B',
  '#A94C79',
  '#4FA083',
  '#CD7D50',
  '#BEAFDE',
  '#01180C',
  '#D19A9A',
  '#2F2F2F',
  '#96187A',
  '#4E4779',
  '#53BA8F',
  '#865324',
  '#28226C',
];

function ChatWallpaper({ currentSetting, setCurrentSetting }) {
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${
        currentSetting === 'ChatWallpaper' ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2   ">
          <LuWallpaper />
          <p>Chat Wallpaper</p>
        </h1>
      </div>

      <div className="w-full">
        <h1 className="font-[400] mb-2 mt-5 text-primaryTextColor flex items-center w-full justify-between">
          Set Chat Wallpaper
          <Checkbox color="blue" defaultChecked />
        </h1>
      </div>

      <div className="w-full grid grid-cols-3 gap-3 overflow-y-scroll h-full pb-20">
        {bg.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: `${item}`,
            }}
            className={`size-20  rounded-lg`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ChatWallpaper;
