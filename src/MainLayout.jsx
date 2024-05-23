import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { Sidebar } from './components';
import Loading from './components/Loading';
import { selectLoggedInStatus } from './selectors/authStatusSelectors';
import { useDispatch } from 'react-redux';
import { fetchUser } from './slices/authSlice';
import { selectAuthLoading } from './selectors/authLoadingSelector';
import { useEffect } from 'react';
import { selectUserDetails } from './selectors/userSelector';
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  
  
  const authLoading = useSelector(selectAuthLoading);
  const loggedInStatus = useSelector(selectLoggedInStatus);


  if (authLoading === true) {
    return <Loading />;
  }
  if (loggedInStatus === false) {
      return (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      );
    }

  return (
    <div className="w-full h-screen flex overflow-hidden select-none">
      {/* Sidebar */}
      <div className="h-screen w-[70px] flex-shrink-0 bg-sideBarBackgroundColor hidden lg:block">
        <Sidebar />
      </div>

      <Outlet />

      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MainLayout;
