import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { MdPrivacyTip } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../selectors/userSelector";
import About from "./SubSetting/About";
import BlockedContacts from "./SubSetting/BlockedContacts";
import LastSeen from "./SubSetting/LastSeen";
import OnlineStatus from "./SubSetting/OnlineStatus";
import ProfilePhotoSetting from "./SubSetting/ProfilePhotoSetting";
import PinSystem from "./SubSetting/PinSystem";


const privacySettings = [
  {
    name: "Show my last seen",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my online status",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my typing status",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my profile picture",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my phone number",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my email",
    icon: <BiRightArrowAlt />,
  },
  {
    name: "Show my location",
    icon: <BiRightArrowAlt />,
  }
]

export const Privacy = ({ currentSetting, setCurrentSetting }) => {
  const user = useSelector(selectUserDetails);
  const [currentPrivacySetting, setCurrentPrivacySetting] = useState('');



  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full  bg-backgroundColor z-[100] p-4 transition-transform duration-300 flex flex-col  ${currentSetting === 'Privacy' ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer text-primaryTextColor" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2   ">
          <MdPrivacyTip />
          <p>Privacy</p>
        </h1>
      </div>

      <div className="mt-10 flex flex-col gap-4  overflow-y-scroll h-full w-full  cursor-pointer text-primaryTextColor pb-32">
        <div
          style={{
            borderBottom: '1px solid rgb(229 231 235 / 17%)',
          }}
          onClick={() => setCurrentPrivacySetting('Last Seen')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>Last Seen</h1>
            <p className="text-sm text-secondaryTextColor">{user?.settings.last_seen_view}</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200] text-primaryTextColor" />
        </div>
        <div
          style={{
            borderBottom: '1px solid rgb(229 231 235 / 17%)',
          }}
          onClick={() => setCurrentPrivacySetting('Online Status')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>Online Status</h1>
            <p className="text-sm text-secondaryTextColor">{user?.settings.online_status_view}</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200] text-primaryTextColor" />
        </div>
        <div
          style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }}
          onClick={() => setCurrentPrivacySetting('Profile Photo')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>Profile Photo</h1>
            <p className="text-sm text-secondaryTextColor">{user?.settings.user_profile_view}</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200]" />
        </div>
        <div
          style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }}
          onClick={() => setCurrentPrivacySetting('About')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>About</h1>
            <p className="text-sm text-secondaryTextColor">{user.settings?.user_bio_view}</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200]" />
        </div>
        <div
          style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }}
          onClick={() => setCurrentPrivacySetting('Pin System')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>Pin System</h1>
            <p className="text-sm text-secondaryTextColor">{user.settings?.user_bio_view}</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200]" />
        </div>

        <div style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }} className="w-full h-16  flex justify-between items-center">
          <div>
            <h1>Groups</h1>
            <p className="text-sm text-secondaryTextColor">Everyone</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200]" />
        </div>
        <div
          style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }}
          onClick={() => setCurrentPrivacySetting('Blocked Contacts')}
          className="w-full h-16  flex justify-between items-center"
        >
          <div>
            <h1>Blocked contacts</h1>
            <p className="text-sm text-secondaryTextColor">0</p>
          </div>
          <BiRightArrowAlt className="text-xl cursor-pointer font-[200]" />
        </div>

      </div>

      <LastSeen currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
      <OnlineStatus currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
      <ProfilePhotoSetting currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
      <About currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
      <PinSystem currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
      <BlockedContacts currentPrivacySetting={currentPrivacySetting} setCurrentPrivacySetting={setCurrentPrivacySetting} />
    </div>
  );
};
