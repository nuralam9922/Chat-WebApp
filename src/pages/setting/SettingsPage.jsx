import { Checkbox } from '@material-tailwind/react';
import React, { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { CgShortcut } from 'react-icons/cg';
import { FaThemeco } from 'react-icons/fa6';
import { GrNotification } from 'react-icons/gr';
import { IoHelp } from 'react-icons/io5';
import { LiaThemeisle } from 'react-icons/lia';
import { LuWallpaper } from 'react-icons/lu';
import { MdPrivacyTip, MdSecurity } from 'react-icons/md';
import settingPageImage from '../../assets/setting.svg';
import BottomBarForMobile from '../../components/Sidebar/BottomBarForMobile';
import { Privacy } from './SubSettings/Privacy/Privacy';
import { Notifications } from './SubSettings/Notifications/Notifications';
import Security from './SubSettings/Security/Security';
import ChatWallpaper from './SubSettings/ChatWallpaper/ChatWallpaper';
import Theme from './SubSettings/Theme';

const settingName = [
  {
    name: 'Notifications',
    icon: <GrNotification />,
  },
  {
    name: 'Privacy',
    icon: <MdPrivacyTip />,
  },
  {
    name: 'Security',
    icon: <MdSecurity />,
  },
  {
    name: 'Chat Wallpaper',
    icon: <LuWallpaper />,
  },
  {
    name: 'Theme',
    icon: <FaThemeco />,
  },
  {
    name: 'Account',
    icon: <CgShortcut />,
  },
  {
    name: 'Shortcuts',
    icon: <LiaThemeisle />,
  },
  {
    name: 'Help',
    icon: <IoHelp />,
  },
];

const SettingsPage = () => {
  const [currentSetting, setCurrentSetting] = useState('');
  return (
    <div className="h-screen w-full flex justify-between md:flex-row bg-backgroundColor select-none ">
      {/* SettingsSidebar */}
      <div className="w-full lg:w-[384px] h-full  p-4 relative overflow-hidden">
        <h1 className="text-2xl font-bold text-primaryTextColor">Setting</h1>

        <div className="w-full mt-10 flex items-start gap-5">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="size-[70px] object-cover rounded-full" alt="" />
          <div>
            <h1 className="font-[600] text-primaryTextColor">User Name</h1>
            <p className="text-secondaryTextColor">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        <div className="overflow-y-scroll h-full  w-full pb-32">
          {settingName.map(item => (
            <div
              onClick={() => setCurrentSetting(item.name === 'Chat Wallpaper' ? 'ChatWallpaper' : item.name)}
              key={item.name}
              style={{
                borderBottom: '1px solid rgb(229 231 235 / 17%)',
              }}
              className="w-full  flex items-center h-16 cursor-pointer"
            >
              <div className="flex items-center gap-5 font-[600] text-primaryTextColor cursor-pointer">
                {item.icon}
                <h1>{item.name}</h1>
              </div>
            </div>
          ))}
        </div>
        <Notifications currentSetting={currentSetting} setCurrentSetting={setCurrentSetting} />
        <Privacy currentSetting={currentSetting} setCurrentSetting={setCurrentSetting} />
        <Security currentSetting={currentSetting} setCurrentSetting={setCurrentSetting} />
        <ChatWallpaper currentSetting={currentSetting} setCurrentSetting={setCurrentSetting} />
        <Theme currentSetting={currentSetting} setCurrentSetting={setCurrentSetting} />
      </div>

      <div className="w-full hidden lg:block h-full">
        <img src={settingPageImage} className="w-full h-screen" alt="" />
      </div>

      <BottomBarForMobile />
    </div>
  );
};

export default SettingsPage;
