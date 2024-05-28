
import React, { useState } from 'react';

import { BiLeftArrowAlt } from 'react-icons/bi';
import { LuWallpaper } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../../../../selectors/userSelector';
import { GiHandOk } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { setChatBackground } from '../../../../slices/useThemeSlice';
import userService from '../../../../services/userService';
import { setAlert } from '../../../../slices/alertSlice';

const bg = [
  '#F0F8FF', // Alice Blue
  '#FAEBD7', // Antique White
  '#F5F5DC', // Beige
  '#FFFACD', // Lemon Chiffon
  '#E6E6FA', // Lavender
  '#FFF5EE', // Seashell
  '#F0FFF0', // Honeydew
  '#F5FFFA', // Mint Cream
  '#FFFFE0', // Light Yellow
];

function ChatWallpaper({ currentSetting, setCurrentSetting }) {
  const user = useSelector(selectUserDetails)
  const dispatch = useDispatch();
  const [currentSelectedChatBackground, setCurrentSelectedChatBackground] = useState(user.preferences.chatBackground || '#D9D9D9');

  const handelShowAlert = () => {
    dispatch(setAlert({ open: true, type: 'success',  content: 'theme update successfully!!' }))
  };


  const handelSetChatBackground = async (item) => {

    try {
     const respond = await userService.updateUserDetails(user.id, { preferences: { ...user.preferences, chatBackground: item } })
      if (respond) {
        setCurrentSelectedChatBackground(item)
        dispatch(setChatBackground(item))
        handelShowAlert()
      }
    } catch (error) {
      console.log('Error setting chat background:', error);
    }


    // dispatch()
  }



  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${currentSetting === 'ChatWallpaper' ? 'flex' : 'hidden'
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
        </h1>
      </div>

      <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-3 gap-3 overflow-y-scroll h-full pb-20 mt-4">
        {bg.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: `${item}`,
            }}
            onClick={() => handelSetChatBackground(item)}
            className={`size-20  rounded-lg cursor-pointer hover:shadow-2xl shadow-[${item}] hover:scale-105   duration-150 flex items-center justify-center border border-blue-400`}
          >
            {currentSelectedChatBackground === item && <div className='bg-[#fff] p-2 rounded-full text-black'><TiTick /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatWallpaper;
