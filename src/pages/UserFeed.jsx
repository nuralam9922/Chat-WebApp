import React from 'react';
import { BiCommentAdd } from 'react-icons/bi';
import { BsHeart, BsPostcard, BsShare } from 'react-icons/bs';
import { CgAdd, CgTrash } from 'react-icons/cg';
import { FiSave } from 'react-icons/fi';
import { MdCreate } from 'react-icons/md';
import useWindowWidth from '../hooks/useWindowWidth';
import { Sidebar } from '../components';
import BottomBarForMobile from '../components/Sidebar/BottomBarForMobile';

const stories = [
  {
    id: 1,
    name: 'User 1',
    image:
      'https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    name: 'User 2',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'User 3',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'User 4',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    name: 'User 5',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 6,
    name: 'User 6',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
  },
  { id: 7, name: 'User 7', image: 'https://via.placeholder.com/50' },
  { id: 8, name: 'User 8', image: 'https://via.placeholder.com/50' },
  { id: 9, name: 'User 9', image: 'https://via.placeholder.com/50' },
  { id: 10, name: 'User 10', image: 'https://via.placeholder.com/50' },
];

const posts = [
  {
    id: 1,
    user: 'User 1',
    content: 'This is the first post content.',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    likes: 10,
    comments: 5,
  },
  {
    id: 2,
    user: 'User 2',
    content: 'This is the second post content.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    likes: 20,
    comments: 10,
  },
  {
    id: 3,
    user: 'User 3',
    content: 'This is the third post content.',
    image:
      'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    likes: 30,
    comments: 15,
  },
];

function UserFeed() {
  const [width] = useWindowWidth();
  
  return (
    <div className="flex w-full">
      <div
        style={{
          display: width > 1213 ? 'flex' : 'none',
        }}
        className="w-1/3 hidden lg:flex"
      >
        <FeedSidebar />
      </div>
      <div className="mx-auto w-full h-screen overflow-y-scroll p-3 pb-20 lg:pb-0">
        <div className="w-full max-w-4xl mx-auto">
          {/* Stories */}
          <h1 className="py-2 text-xl font-semibold text-secondaryTextColor">Stories</h1>
          <div className={'flex overflow-x-scroll lg:overflow-hidden h-52 cursor-pointer gap-3  md:justify-between'}>
            {stories.slice(0, width > 1213 ? 6 : 5000).map(user => (
              <div key={user.id} className="stories h-full w-32 border bg-amber-300 rounded-lg overflow-hidden relative flex-shrink-0">
                <img src="https://via.placeholder.com/200" className="w-full h-full object-cover" alt="" />
                <div className="absolute top-2 left-2 border-2 border-white flex items-center justify-center w-10 h-10 z-50 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={user.image} alt={user.name} />
                </div>
                <h1 className="absolute bottom-2 left-2 text-white">{user.name}</h1>
              </div>
            ))}
          </div>

          {/* showing in only in mobile and tabes  */}

          <div className="w-full py-5 lg:hidden">
            <div className="w-full grid grid-cols-2 sm:flex  mt-2 gap-3 flex-wrap ">
              <div className="flex-grow h-10 bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-2 gap-2 justify-center capitalize">
                <CgAdd /> <p> Add post</p>
              </div>
              <div className="flex-grow h-10 bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center justify-center px-2 gap-2">
                <MdCreate /> <p> Add A story</p>
              </div>
              <div className="flex-grow h-10 bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center justify-center px-2 gap-2">
                <BsPostcard /> <p> Manage Posts</p>
              </div>
             
              <div className="flex-grow h-10 bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center justify-center px-2 gap-2">
                <FiSave /> <p> Saved post</p>
              </div>
              {/* <div className="flex-grow h-10 bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-2 gap-2">
                <FiSave /> <p> Saved post</p>
              </div> */}
              {/* Add more options as needed */}
            </div>
          </div>

          {/* Posts */}
          <div className="mt-6 w-full md:w-[70%] md:mx-auto">
            {posts.map(post => (
              <div key={post.id} className="bg-white md:p-4 rounded-lg shadow-md mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://via.placeholder.com/50" alt={post.user} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{post.user}</h4>
                    <span className="text-gray-500 text-sm">2 hours ago</span>
                  </div>
                </div>
                <p className="mt-4">{post.content}</p>
                {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-lg w-full object-cover" />}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-blue-500 hover:bg-cyan-100 px-3 p-1 rounded-md hover:text-blue-900 duration-200">
                      <span className="flex items-center justify-center gap-2">
                        {post.likes} <BsHeart />
                      </span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-500 hover:bg-cyan-100 px-3 p-1 rounded-md hover:text-blue-900 duration-200">
                      <span className="flex items-center justify-center gap-2">
                        {post.comments} <BiCommentAdd />
                      </span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-blue-500 hover:bg-cyan-100 px-3 p-1 rounded-md hover:text-blue-900 duration-200">
                    <BsShare /> <span className="ml-2">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBarForMobile />
      
    </div>
  );
}
const FeedSidebar = () => {
  return (
    <div className=" flex-col w-full md:w-full  text-white h-full px-4 border ">
      <h1 className="text-2xl font-bold text-primaryTextColor mt-5">Menu</h1>
      <div className="w-full flex flex-col mt-2 gap-3">
        <div className="w-full h-14  bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-4 gap-2">
          <CgAdd /> <p> Add post</p>
        </div>
        <div className="w-full h-14  bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-4 gap-2">
          <MdCreate /> <p> Add A story</p>
        </div>
        <div className="w-full h-14  bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-4 gap-2">
          <CgTrash /> <p> Delete post</p>
        </div>
        <div className="w-full h-14  bg-gray-100 rounded-lg cursor-pointer hover:hover:bg-gray-300 text-primaryTextColor flex items-center px-4 gap-2">
          <BsPostcard /> <p> Manage Posts</p>
        </div>
        {/* Add more options as needed */}
      </div>
    </div>
  );
};

export default UserFeed;
