import React, { useState } from 'react';
import { Button, Input, Select, Option, Switch } from '@material-tailwind/react';

function UserSetting() {
  const [lastSeen, setLastSeen] = useState('Everyone');
  const [onlineStatus, setOnlineStatus] = useState('Everyone');
  const [profilePicture, setProfilePicture] = useState('Everyone');
  const [pinEnabled, setPinEnabled] = useState(false);
  const [pin, setPin] = useState('');
  const [pinAskTime, setPinAskTime] = useState(20);
  const handleSave = () => {
    console.log({
      lastSeen,
      onlineStatus,
      profilePicture,
      pinEnabled,
      pin: pinEnabled ? pin : null,
    });
    // Implement the logic to save the settings
  };

  return (
    <div className="flex flex-col md:items-center  min-h-screen  md:p-4">
      <div className="bg-white md:shadow-md rounded-lg p-6 w-full md:max-w-xl flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center mb-6">User Settings</h2>

        <div className="mb-4 flex flex-col ">
          <h3 className="text-lg font-semibold">Last Seen</h3>
          <Select value={lastSeen} onChange={e => setLastSeen(e.target.value)} className="w-full mt-2">
            <Option value="Everyone">Everyone</Option>

            <Option value="Nobody">Nobody</Option>
          </Select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Online Status</h3>
          <Select value={onlineStatus} onChange={e => setOnlineStatus(e.target.value)} className="w-full mt-2">
            <Option value="Everyone">Everyone</Option>

            <Option value="Nobody">Nobody</Option>
          </Select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Profile Picture</h3>
          <Select value={profilePicture} onChange={e => setProfilePicture(e.target.value)} className="w-full mt-2">
            <Option value="Everyone">Everyone</Option>

            <Option value="Nobody">Nobody</Option>
          </Select>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enable PIN</h3>
          <Switch checked={pinEnabled} onChange={e => setPinEnabled(e.target.checked)} color="blue" />
        </div>

        {pinEnabled && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Set PIN</h3>
            <Input type="password" color="blue" size="lg" outline={true} label="Enter PIN" placeholder="Enter PIN" value={pin} onChange={e => setPin(e.target.value)} required />
          </div>
        )}
        {pinEnabled && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Show PIN Box (Pin Ask Time In Minutes)</h3>
            <Input type="number" color="blue" size="lg" label={pinAskTime} value={pinAskTime} onChange={e => setPinAskTime(e.target.value)} required />
          </div>
        )}

        <div className="flex  mt-6">
          <Button color="blue" size="lg" ripple="light" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
