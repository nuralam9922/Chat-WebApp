import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import UserCard from '../../../components/userCard/userCard.jsx';
import userFriendService from '../../../services/userFriendService';
import { setSearchTeamsString, setSearchUser } from '../../../slices/searchUser.js';
import { useSelector } from 'react-redux';

function SearchFriendsComponent() {
  const { searchUser: searchUserDetails, searchTeams } = useSelector((state) => state.searchUserResults);

  const [searchTerm, setSearchTerm] = useState(searchTeams);
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();

  const [searchLoading, setSearchLoading] = useState(false);


  const handleSearch = async () => {
    setUserNotFound(false);
    if (searchTerm.trim() === '') {
      return;
    } else {
      try {
        setSearchLoading(true);
        await userFriendService.getSearchedUsers(searchTerm, (response) => {
          dispatch(setSearchUser(response));
        });
        dispatch(setSearchTeamsString(searchTerm));

        setSearchLoading(false);
      } catch (error) {
        console.log('Error searching users:', error);
      }
    }
  };



  return (
    <div className={`max-w-6xl mx-auto mt-8 text-primaryTextColor`}>
      <div className="flex items-center gap-2 mb-8 h-full">
        <Input
          type="search"
          placeholder="Search for friends..."
          label="Search for friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FiSearch />}
          color="blue"
          className={`flex-1 focus:border focus:border-blue-400 border-blue-400`}
          size="lg"
        />
        <Button loading={searchLoading} onClick={() => handleSearch()} color="blue" className="px-2 sm:px-5">
          Search
        </Button>
      </div>
      <h1 className='text-center'>{userNotFound}</h1>
      {searchUserDetails.length > 0 && (
        <div className="w-full">
          <h1 className='mt-8 text-xl'>Search Results</h1>
          <div className='w-full flex flex-col gap-3'>
            {searchUserDetails?.map((user) => (
              <UserCard key={user.id} user={user} AddUserButton={true} />
            ))}
          </div>
        </div>
      )}

      {/* <div>
        <h1 className='mt-8 text-xl'>Suggested Friends</h1>
        {friends.map((request) => (
          <UserCard key={request.id} user={request} AddUserButton={true} />
        ))}
      </div> */}



    </div >);

}

export default SearchFriendsComponent;
