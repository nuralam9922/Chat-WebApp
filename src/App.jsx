import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';

const MainLayout = React.lazy(() => import('./MainLayout'));
const SettingsPage = React.lazy(() => import('./pages/setting/SettingsPage'));
const UserFeed = React.lazy(() => import('./pages/UserFeed'));
const ChatWindow = React.lazy(() => import('./components/ChatWindow/ChatWindow'));
const Messages = React.lazy(() => import('./components/Messages/Messages'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const FriendRequestPage = React.lazy(() => import('./pages/FriendRequestPage '));
const UserInitiation = React.lazy(() => import('./pages/UserInitiation/UserInitiation'));
const ErrorSection = React.lazy(() => import('./pages/ErrorSection'));
const User = React.lazy(() => import('./pages/User'));

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <svg className="w-40" viewBox="0 0 350 212.909198897464">
        <defs id="SvgjsDefs1194"></defs>
        <g id="SvgjsG1195" featurekey="e7LhAk-0" transform="matrix(7.777777777777778,0,0,7.777777777777778,81.66666666666667,-27.22222222222222)" fill="#5e63b6">
          <title xmlns="http://www.w3.org/2000/svg">bluetooth</title>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M5.5,20.5A.5.5,0,0,1,5,20l-.4-4A7.34,7.34,0,0,1,3,11.5c0-4.41,4-8,9-8s9,3.59,9,8-4,8-9,8a10,10,0,0,1-2.67-.36L5.67,20.47A.49.49,0,0,1,5.5,20.5ZM12,4.5c-4.41,0-8,3.14-8,7a6.37,6.37,0,0,0,1.47,4,.5.5,0,0,1,.11.26l.35,3.51,3.21-1.17a.5.5,0,0,1,.31,0A9,9,0,0,0,12,18.5c4.41,0,8-3.14,8-7S16.41,4.5,12,4.5Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M12.5,13.5a.5.5,0,0,1-.47-.33l-.81-2.32L7.72,12.59a.5.5,0,1,1-.45-.89l4-2A.5.5,0,0,1,12,10l.82,2.34,3.5-1.62a.5.5,0,0,1,.42.91l-4,1.86A.5.5,0,0,1,12.5,13.5Z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

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
  {
    path: '/user-initiation',
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorSection />
      </Suspense>
    ),
    element: (
      <Suspense fallback={<Loading />}>
        <UserInitiation />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
