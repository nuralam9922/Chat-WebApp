import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';

const MainLayout = React.lazy(() => import('./MainLayout'));
const SettingsPage = React.lazy(() => import('./pages/setting/SettingsPage'));
const UserFeed = React.lazy(() => import('./pages/UserFeed'));
const ChatWindow = React.lazy(() => import('./components/ChatWindow/ChatWindow'));
const Messages = React.lazy(() => import('./components/Messages/Messages'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const FriendRequestPage = React.lazy(() => import('./pages/UserFriends/UserFriends'));
// const UserInitiation = React.lazy(() => import('./pages/UserInitiation/UserInitiation'));
const ErrorSection = React.lazy(() => import('./pages/ErrorSection'));
const User = React.lazy(() => import('./pages/User'));


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorSection />
      </Suspense>
    ),
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <div  className="w-full lg:w-[393px] flex justify-center flex-shrink-0">
              <Messages />
            </div>
            <div className="w-full  hidden lg:block ">
              <ChatWindow />
            </div>
          </Suspense>
        ),
      },
      {
        path: '/user',
        errorElement: (
          <Suspense fallback={<Loading />}>
            <ErrorSection />
          </Suspense>
        ),
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: '/settings',
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: 'friends',
        element: (
          <Suspense fallback={<Loading />}>
            <FriendRequestPage />
          </Suspense>
        ),
      },
      {
        path: '/feed',
        element: (
          <Suspense fallback={<Loading />}>
            <UserFeed />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth/login',
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorSection />
      </Suspense>
    ),
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  // {
  //   path: '/user-initiation',
  //   errorElement: (
  //     <Suspense fallback={<Loading />}>
  //       <ErrorSection />
  //     </Suspense>
  //   ),
  //   element: (
  //     <Suspense fallback={<Loading />}>
  //       <UserInitiation />
  //     </Suspense>
  //   ),
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
