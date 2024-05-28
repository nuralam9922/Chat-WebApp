import { Checkbox } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserDetails } from '../../../../selectors/userSelector';
import { setAlert } from '../../../../slices/alertSlice';
import { CgNotifications } from 'react-icons/cg';
import userService from '../../../../services/userService';
import { updateUserDetails } from '../../../../slices/authSlice';
import { Switch } from '@material-tailwind/react';

export const Notifications = ({ currentSetting, setCurrentSetting }) => {
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [notificationsValue, setNotificationsValue] = useState();

  useEffect(() => {
    setNotificationsValue(user.notifications.push);
  }, [user.notifications.push]);

  const handleShowAlert = () => {
    dispatch(setAlert({ open: true, type: 'success', icon: <CgNotifications />, content: 'Notifications updated successfully!' }));
  };

  const handleClick = async () => {
    try {
      const response = await userService.updateUserDetails(user.id, { notifications: { push: !notificationsValue } });
      if (response) {
        dispatch(updateUserDetails({ notifications: { ...user.notifications, push: !notificationsValue } }));
        handleShowAlert();

      }
    } catch (error) {
      console.error('Failed to update notifications:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setNotificationsValue(e.target.checked);
  };

  // useEffect(() => {
  //   handleClick();
  // }, [notifications]);

  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor shadow-md z-[100] p-4 transition-transform duration-300 flex flex-col ${currentSetting === 'Notifications' ? 'flex' : 'hidden'
        }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentSetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer text-primaryTextColor" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2">
          <GrNotification />
          <p>Notifications</p>
        </h1>
      </div>

      <div
        style={{ borderBottom: '1px solid rgb(229 231 235 / 17%)' }}
        className="w-full p-2 mt-20 flex items-center justify-between"
      >
        <div>
          <h1 className="text-base font-[400] text-primaryTextColor">Notifications</h1>
          <p className="text-xs text-secondaryTextColor mt-2">Show notifications for new messages</p>
        </div>
        <Switch checked={notificationsValue} onClick={handleClick} onChange={handleCheckboxChange} />

      </div>
    </div>
  );
};
