import React, { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Loading from '../../components/Loading';
import BottomBarForMobile from '../../components/Sidebar/BottomBarForMobile';
import { selectUserFriendRequestSelector } from '../../selectors/userFriendRequestSelector';
import { selectUserDetails } from '../../selectors/userSelector';
import { useEffect } from 'react';
import userFriendService from '../../services/userFriendService';
import { addFriendRequest, addUserSendedFriendRequestReferences } from '../../slices/userFriendRequestsSlice';
import { setFriends } from '../../slices/userFriendsSlice';

const FriendsComponent = React.lazy(() => import('./Tabs/FriendsComponent'));
const SearchFriendsComponents = React.lazy(() => import('./Tabs/SearchFriendsComponents'));
const FriendRequestsComponents = React.lazy(() => import('./Tabs/FriendRequestsComponents'));

function UserFriends() {
  const [activeTab, setActiveTab] = useState('friends');
  const { theme } = useSelector(state => state.theme);
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const friendRequests = useSelector(selectUserFriendRequestSelector) || [];

  useEffect(() => {

    const unsubscribeSentRequests = userFriendService.getUserSentFriendRequests(user.id, (response) => {
      dispatch(addUserSendedFriendRequestReferences(response));
    });

    const unsubscribeFriends = userFriendService.getUserFriends(user.id, (users) => {
      dispatch(setFriends(users));
    });

    const unsubscribeFriendsRequests = userFriendService.getUserFriendRequests(user.id, (response) => {
      dispatch(addFriendRequest(response));
    })


    return () => {
      unsubscribeFriendsRequests.then((unsubscribe) => {
        unsubscribe();
      });

      unsubscribeFriends.then((unsubscribe) => {
        unsubscribe();
      });

      unsubscribeSentRequests.then((unsubscribe) => {
        unsubscribe();
      });

    }

  }, []);


  return (
    <div className={`h-screen w-full text-primaryTextColor ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-all duration-300 overflow-hidden flex flex-col`}>
      <nav className="mb-4 flex justify-center space-x-2 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg px-4">
        <button
          className={`px-2 flex-grow md:flex-grow-0 md:px-6 py-2 border rounded-full text-xs md:text-base ${activeTab === 'friends' ? 'bg-white text-blue-500 shadow-md' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button
          className={`px-2 flex-grow md:flex-grow-0 md:px-6 py-2 border rounded-full text-xs md:text-base ${activeTab === 'search' ? 'bg-white text-blue-500 shadow-md' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Friends
        </button>
        <button
          className={`px-2 flex-grow md:flex-grow-0 md:px-6 py-2 border rounded-full text-xs md:text-base relative ${activeTab === 'requests' ? 'bg-white text-blue-500 shadow-md' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Friend Requests
          <span style={{
            display: friendRequests.length === 0 && 'none'
          }} className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center">{friendRequests.length}</span>
        </button>
      </nav>

      <div className="px-4 md:px-8 h-full  overflow-y-scroll pb-32">
        {activeTab === 'friends' && (
          <Suspense fallback={<Loading />}>
            <FriendsComponent />
          </Suspense>
        )}
        {activeTab === 'search' && (
          <Suspense fallback={<Loading />}>
            <SearchFriendsComponents />
          </Suspense>
        )}
        {activeTab === 'requests' && (
          <Suspense fallback={<Loading />}>
            <FriendRequestsComponents theme={theme} user={user} friendRequests={friendRequests} />
          </Suspense>
        )}
      </div>

      <BottomBarForMobile />
    </div>
  );
}

export default UserFriends;
