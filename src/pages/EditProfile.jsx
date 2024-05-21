import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

function EditProfile({ onNextStep }) {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');

  const handleImageChange = e => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Implement the logic to update the profile information
    console.log({ name, username, about });
    onNextStep && onNextStep();
  };

  return (
    <div className="flex flex-col items-center justify-center md:p-10 bg-backgroundColor border-2 h-full w-full">
      <div className="bg-white md:shadow-md rounded-lg p-6 w-full md:max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <FiEdit size={32} />
                  </div>
                )}
              </div>
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
            <span className="text-gray-600 mt-2">Change Profile Picture</span>
          </div>
          <div>
            <Input type="text" label="Name" color="blue" size="lg" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Input type="text" label="Username" color="blue" size="lg" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <Textarea type="text" label="About" color="blue" size="lg" placeholder="About" value={about} onChange={e => setAbout(e.target.value)} required />
          </div>
          <div className="flex justify-center">
            <Button type="submit" color="blue" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
