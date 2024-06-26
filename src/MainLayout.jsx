import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { Sidebar } from './components';
import AlertComponent from './components/AlertComponent';
import Loading from './components/Loading';
import { selectAuthLoading } from './selectors/authLoadingSelector';
import { selectLoggedInStatus } from './selectors/authStatusSelectors';
import { selectUserDetails } from './selectors/userSelector';
import messageService from './services/messageService';
import userFriendService from './services/userFriendService';
import { fetchUser } from './slices/authSlice';
import { chatError, chatLoading, setChats } from './slices/chatsSlice';
import { setChatBackground, setTheme } from './slices/useThemeSlice';
import { addFriendRequest, addUserSendedFriendRequestReferences } from './slices/userFriendRequestsSlice';
import { setFriends } from './slices/userFriendsSlice'



// Dynamically imported components
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const UserInitiation = React.lazy(() => import('./pages/UserInitiation/UserInitiation'));
const EditProfile = React.lazy(() => import('./pages/EditProfile'));
const AddNewChatComponent = React.lazy(() => import('./components/AddNewChatComponent/AddNewChatComponent'));

const MainLayout = () => {
  const loggedInUser = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.preferences) {
        dispatch(setTheme(loggedInUser.preferences.theme));
        dispatch(setChatBackground(loggedInUser.preferences.chatBackground));
      }

      const fetchChats = async () => {
        try {
          messageService.getChats(loggedInUser.id,
            (res) => {
              dispatch(setChats(res));
            },
            (loading) => {
              dispatch(chatLoading(loading));
            },
            (error) => {
              dispatch(chatError(error));
            }
          );
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };
      fetchChats();
    }
  }, [loggedInUser, dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      const unsubscribeSentRequests = userFriendService.getUserSentFriendRequests(loggedInUser.id, (response) => {
        dispatch(addUserSendedFriendRequestReferences(response));
      });

      const unsubscribeFriends = userFriendService.getUserFriends(loggedInUser.id, (users) => {
        dispatch(setFriends(users));
      });

      const unsubscribeFriendsRequests = userFriendService.getUserFriendRequests(loggedInUser.id, (response) => {
        dispatch(addFriendRequest(response));
      });

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
      };
    }
  }, [loggedInUser, dispatch]);

  const authLoading = useSelector(selectAuthLoading);
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const [newUser, setNewUser] = useState(false);

  if (authLoading === true && loading) {
    return <Loading />;
  }

  if (loggedInStatus === false) {
    return (
      <Suspense fallback={<Loading />}>
        <LoginPage setNewUser={setNewUser} />
      </Suspense>
    );
  }

  if (newUser === true) {
    return (
      <Suspense fallback={<Loading />}>
        <UserInitiation setNewUser={setNewUser} />
      </Suspense>
    );
  }

  if (!loggedInUser || !loggedInUser.username || loggedInUser.username === '') {
    return (
      <Suspense fallback={<Loading />}>
        <div>
          <h1 className='text-center py-5 '>Please Create A Unique Username!!</h1>
          <div className='flex justify-center w-full lg:max-w-[393px] mx-auto'>
            <EditProfile navigateLink={'/'} />
          </div>
        </div>
      </Suspense>
    );
  }

  return (
    <div className="w-full h-screen flex overflow-hidden select-none">
      {/* Sidebar */}
      <div className="h-screen w-[70px] flex-shrink-0 bg-sideBarBackgroundColor hidden lg:block">
        <Sidebar />
      </div>
      <AlertComponent />
      <Outlet />

      {/* Add new chat */}
      <AddNewChatComponent />
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MainLayout;
