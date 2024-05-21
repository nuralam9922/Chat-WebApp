import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../slices/toggleSidebarSlice';
import { BiEdit } from 'react-icons/bi';

export const ProfileSettings = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [userImageObj, setUserImageObj] = useState('');

  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handelImageChange = e => {
    const file = e.target.files[0];
    setUserImageObj(file);
  }

  const userLocalImage = userImageObj ? URL.createObjectURL(userImageObj) : 'https://via.placeholder.com/150';


  return (
    <div className="w-full  h-full overflow-y-auto p-8 bg-backgroundColor lg:border-l">
      <div className="flex items-center mb-6 md:hidden">
        <button onClick={handleToggleSidebar} className="text-gray-500 focus:outline-none mr-4">
          <FaBars />
        </button>
        <h3 className="text-2xl font-semibold">Profile Settings</h3>
      </div>
      <h3 className="hidden md:block text-2xl font-semibold mb-6">Profile Settings</h3>
      <div className="flex flex-col gap-3 md:gap-0 md:flex md:flex-row items-center mb-6 ">
        <div className="w-24 h-24 relative">
          <img src={userLocalImage} className="rounded-full w-full h-full border-2" alt="User Avatar" />
          <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full"><BiEdit/></div>
          <input onChange={handelImageChange} type="file" name="" id="" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
        <div className="ml-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-all">Upload New</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all">Delete Avatar</button>
        </div>
      </div>
      <form className="space-y-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-blue-500"
              placeholder="First name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none" readOnly placeholder="example@gmail.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">bio</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-blue-500"
            placeholder="type here..."
          ></textarea>
        </div>
        <div className="text-right">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
