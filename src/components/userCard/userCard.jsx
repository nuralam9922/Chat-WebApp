/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeDetails } from '../../selectors/themeSelector';
import { selectUserDetails } from '../../selectors/userSelector';
import userFriendService from '../../services/userFriendService';

import ImageComponent from '../../components/ImageComponent.jsx';
import { selectUserFriendRequestSelector } from '../../selectors/userFriendRequestSelector.js';
import { selectUserFriends } from '../../selectors/userFriendsSelector.js';
import { selectUserSendedFriendRequestReferences } from '../../selectors/userSendedFriendRequestReferencesSelector.js.js';
import { setAlert } from '../../slices/alertSlice.js';

// eslint-disable-next-line react/prop-types
const UserCard = React.memo(function ({ user: userInfo, AddUserButton = false, RejectButton, AcceptButton, CancelButton, DeleteButton, ClickToChatButton }) {
    const theme = useSelector(selectThemeDetails);
    const loggedInUser = useSelector(selectUserDetails);
    const userFriends = useSelector(selectUserFriends);
    const userRequests = useSelector(selectUserFriendRequestSelector);
    const userSendedRequest = useSelector(selectUserSendedFriendRequestReferences);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState({ add: false, cancel: false, reject: false });

    const handelShowAlert = (message) => {
        dispatch(setAlert({ open: true, type: 'success', content: message }))
    };


    const handleAddUser = async (id) => {
        const response = await userFriendService.sendFriendRequest(loggedInUser.id, id);
        handelShowAlert(response);
    };

    const handelExceptFriendRequest = async (friendId) => {
        console.log(friendId);
        const requestDocument = userRequests.find((request) => request.sender.id === friendId);
        const documentId = requestDocument.requestId
        const response = await userFriendService.acceptFriendRequest(documentId);
        handelShowAlert(response);
    }


    const checkIfFriend = () => {
        if (userFriends.some((friend) => friend.id === userInfo.id)) {
            return true;
        }
        return false;
    };

    const checkIfUserSendedFriendRequest = () => {
        if (userRequests.some((friend) => friend.sender.id === userInfo.id)) {
            return true;
        }
        return false;
    };

    const checkUserAlreadySentFriendRequest = () => {
        if (userSendedRequest.some((request) => request.recipientId === userInfo.id)) {

            return true;
        }
        return false;
    };



    return (
        <>
            <Card key={userInfo.id} className="mb-4 bg-backgroundColor">
                <CardBody className="flex md:items-start justify-start md:justify-between flex-col md:flex-row gap-5">
                    <div className="flex items-start space-x-4">
                        <ImageComponent
                            imageUrl={userInfo.user_profile_view === 'everyone' ? userInfo.profile_picture_url.
                                imageUrl : ''}
                            imageAlt={userInfo.username}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="w-32 break-all">
                            <Typography variant="h6" className="text-primaryTextColor w-52 capitalize">
                                {userInfo.full_name}
                            </Typography>
                            <Typography className="text-secondaryTextColor w-full text-xs">

                                {userInfo.username}
                            </Typography>

                            <Typography
                                // eslint-disable-next-line react/prop-types
                                style={{ display: userInfo.user_bio_view === 'everyone' ? 'block' : 'none' }}
                                variant="small"
                                className="text-secondaryTextColor w-52 break-all"
                            >
                                {userInfo.bio}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div style={{
                            display: loggedInUser.id === userInfo.id || checkIfFriend() || checkIfUserSendedFriendRequest() || checkUserAlreadySentFriendRequest() ? 'none' : 'flex',
                        }} >
                            <Button color='blue' className='' hidden={!AddUserButton} onClick={() => handleAddUser(userInfo.id, true)}>
                                Send Friend Request
                            </Button>

                        </div>

                    </div>
                </CardBody>

            </Card>
        </>
    );
})

UserCard.displayName = 'UserCard'

export default UserCard;
