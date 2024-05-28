import { Button, CardBody, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserFriendRequestSelector } from '../../../selectors/userFriendRequestSelector.js';
import { selectUserSendedFriendRequestReferences } from '../../../selectors/userSendedFriendRequestReferencesSelector.js';
import userFriendService from '../../../services/userFriendService.js';
import { selectThemeDetails } from '../../../selectors/themeSelector.js';
import { selectUserDetails } from '../../../selectors/userSelector.js';
import { Card } from '@material-tailwind/react';
import ImageComponent from '../../../components/ImageComponent.jsx';
import { Typography } from '@material-tailwind/react';

const RequestsComponents = React.memo(() => {
  const theme = useSelector(selectThemeDetails);
  const loggedInUser = useSelector(selectUserDetails);
  const userSendedFriendRequest = useSelector(selectUserSendedFriendRequestReferences);
  const userRequests = useSelector(selectUserFriendRequestSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  const handleAction = async (action, requestId) => {
    setLoading(prev => ({ ...prev, [requestId]: true }));

    let response;
    if (action === 'accept') {
      response = await userFriendService.acceptFriendRequest(requestId);
    } else if (action === 'reject') {
      response = await userFriendService.rejectFriendRequest(requestId);
    }

    setLoading(prev => ({ ...prev, [requestId]: false }));
  };


  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-8 h-full">
        <Input
          type="search"
          placeholder="Search for friends..."
          label="Search for friends..."
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FiSearch />}
          color="blue"
          className="flex-1 focus:border focus:border-blue-400 border-blue-400"
        />
        <Button onClick={() => console.log('Search..')} color="blue" className="px-2 sm:px-5">
          Search
        </Button>
      </div>
      <div className="w-full">
        <div className='w-full flex flex-col gap-3'>
          {userRequests.length > 0 ? (
            <div className="w-full">
              <h1 className='mt-8 text-xl'>Search Results</h1>
              <div className='w-full flex flex-col gap-3'>
                {userRequests?.map((request) => (
                  <Card key={request.sender.id} className="mb-4 bg-backgroundColor">
                    <CardBody className="flex md:items-start justify-start md:justify-between flex-col md:flex-row gap-5">
                      <div className="flex items-start space-x-4">
                        <ImageComponent
                          imageUrl={request.sender.user_profile_view === 'everyone' ? request.sender.profile_picture_url.imageUrl : ''}
                          imageAlt={request.sender.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="w-32 break-all">
                          <Typography variant="h6" className="text-primaryTextColor w-52 capitalize">
                            {request.sender.full_name}
                          </Typography>
                          <Typography className="text-secondaryTextColor w-full text-xs">
                            {request.sender.username}
                          </Typography>
                          <Typography
                            style={{ display: request.sender.user_bio_view === 'everyone' ? 'block' : 'none' }}
                            variant="small"
                            className="text-secondaryTextColor w-52 break-all"
                          >
                            {request.sender.bio}
                          </Typography>
                        </div>
                      </div>
                      <div className='flex gap-3'>
                        <Button
                          color='blue'
                          className='text-xs'
                          onClick={() => handleAction('accept', request.requestId)}
                          size='sm'
                          disabled={loading[request.requestId]}
                        >
                          {loading[request.requestId] && loading[request.requestId] === 'accept' ? 'Loading...' : 'Accept'}
                        </Button>
                        <Button
                          color='red'
                          onClick={() => handleAction('reject', request.requestId)}
                          disabled={loading[request.requestId]}
                        >
                          {loading[request.requestId] && loading[request.requestId] === 'reject' ? 'Loading...' : 'Reject'}
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div><h1>No results found</h1></div>
          )}
        </div>
      </div>
    </div>
  );
});

RequestsComponents.displayName = 'RequestsComponents';
export default RequestsComponents;
