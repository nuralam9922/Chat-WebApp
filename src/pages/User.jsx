import React from 'react'
import EditProfile from './EditProfile'
import BottomBarForMobile from '../components/Sidebar/BottomBarForMobile'
function user() {
  return (
    <div className='w-full h-screen relative'>
      <EditProfile />

      <BottomBarForMobile/>
    </div>
  )
}

export default user