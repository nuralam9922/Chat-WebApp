import { Button } from '@material-tailwind/react';
import { Avatar } from '@material-tailwind/react';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import BottomBarForMobile from '../components/Sidebar/BottomBarForMobile';

function FriendRequestPage() {
  const [activeTab, setActiveTab] = useState('friends');

  const requests = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  const pendingRequests = [
    { id: 1, name: 'Charlie' },
    { id: 2, name: 'Dave' },
  ];

  const friends = [
    { id: 1, name: 'Eve' },
    { id: 2, name: 'Frank' },
  ];

  return (
    <div className="min-h-screen bg-backgroundColor w-full">
      <div className=" shadow-md rounded-lg p-6 h-full">
        <h1 className="text-2xl font-bold mb-4">Friend Requests</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <button
            className={`ml-2 px-4 py-2 flex-grow md:flex-grow-0 rounded-lg ${activeTab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
          <button
            className={`px-4 py-2 flex-grow md:flex-grow-0 rounded-lg ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('requests')}
          >
            Friend Requests
          </button>
        </div>

        {activeTab === 'friends' && (
          <div className="lg:max-w-4xl lg:mx-auto">
            {friends.length > 0 ? (
              <ul>
                {friends.map(friend => (
                  <li key={friend.name} className="bg-gray-100 p-4 rounded-lg mb-2 shadow-sm flex justify-between">
                    <div className="flex gap-4">
                      {' '}
                      <Avatar className="rounded-full lg:size-32" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                      <span>{friend.name}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Button color="blue" className="text-xs px-3 w-fit">
                        Open To Chat
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have no friends yet.</p>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="lg:max-w-4xl lg:mx-auto">
            {requests.length > 0 ? (
              <ul>
                {requests.map(request => (
                  <li key={request.id} className="bg-gray-100 p-4 rounded-lg mb-2 shadow-sm flex justify-between">
                    <div className="flex gap-4">
                      {' '}
                      <Avatar className="rounded-full lg:size-32" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                      <span>{request.name}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Button color="blue" className="text-xs px-3 w-fit">
                        Accept
                      </Button>
                      <Button color="red" className="text-xs px-3 w-fit">
                        Reject
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new friend requests.</p>
            )}
          </div>
        )}
      </div>
      <BottomBarForMobile />
    </div>
  );
}

export default FriendRequestPage;
