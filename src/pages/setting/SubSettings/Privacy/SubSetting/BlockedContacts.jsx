import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const blockedUsers = [
  { id: 1, name: 'John Doe', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  { id: 2, name: 'Jane Smith', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
];

function BlockedContacts({ currentPrivacySetting, setCurrentPrivacySetting }) {
  const handleRemove = id => {
    // Implement the logic to remove the user from the blocked list
    console.log(`Remove user with id: ${id}`);
  };

  return (
    <div
      className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${
        currentPrivacySetting === 'Blocked Contacts' ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div onClick={() => setCurrentPrivacySetting('')}>
          <BiLeftArrowAlt className="text-3xl cursor-pointer" />
        </div>
        <h1 className="text-2xl font-bold text-primaryTextColor flex items-center gap-2">
          <p>Blocked Contacts</p>
        </h1>
      </div>

      <div className="mt-10">
        {blockedUsers.map(user => (
          <div key={user.id} className="w-full flex items-center justify-between border-b-2 py-2">
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 object-cover rounded-full" />
              <p className="font-medium text-lg">{user.name}</p>
            </div>
            <AiOutlineClose className="text-xl cursor-pointer text-red-500" onClick={() => handleRemove(user.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockedContacts;
