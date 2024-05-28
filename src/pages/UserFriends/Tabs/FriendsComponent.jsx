import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ImageComponent from '../../../components/ImageComponent';
import { selectUserFriends } from '../../../selectors/userFriendsSelector';
import { selectUserDetails } from '../../../selectors/userSelector';
import userFriendService from '../../../services/userFriendService';
import { setFriends } from '../../../slices/userFriendsSlice';

const demoFriends = [
    { id: 1, name: 'John Doe', bio: 'Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Jane Smith', bio: 'Consectetur adipiscing elit.' },
    { id: 3, name: 'Alice Johnson', bio: 'Sed do eiusmod tempor incididunt ut labore.' },
    { id: 4, name: 'Bob Brown', bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.' },
    // Add more demo friends as needed
];




function FriendsComponent() {
    const userFriends = useSelector(selectUserFriends)
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFriends = demoFriends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const handelDeleteFriend = async (friendshipId) => {
        const response = await userFriendService.deleteFriendship(friendshipId);
        console.log(response);
    };


    return (
        <div className="max-w-6xl mx-auto mt-8 text-primaryTextColor">
            <div className="flex items-center gap-2 mb-8 h-full">
                <Input
                    type="search"
                    placeholder="Search for friends..."
                    label="Search for friends..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<FiSearch />}
                    color="blue"
                    // style={{
                    //   backgroundColor: theme === 'light' ? 'white' : '#212121',
                    // }}
                    className={`flex-1 focus:border focus:border-blue-400 border-blue-400`}

                // size="lg"
                />
                <Button onClick={() => console.log('Search..')} color="blue" className="px-2 sm:px-5">
                    Search
                </Button>
            </div>
            <div className='w-full flex flex-col gap-4'>
                {userFriends.length > 0 ? (
                    userFriends.map((friend) => (
                        <Card key={friend.id} className="mb-4 bg-backgroundColor">
                            <CardBody className="flex md:items-start justify-start md:justify-between flex-col md:flex-row gap-5">
                                <div className="flex items-start space-x-4">
                                    <ImageComponent
                                        imageUrl={friend.user_profile_view === 'everyone' ? friend.profile_picture_url.
                                            imageUrl : ''}
                                        imageAlt={friend.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="w-32 break-all">
                                        <Typography variant="h6" className="text-primaryTextColor w-52 capitalize">
                                            {friend.full_name}
                                        </Typography>
                                        <Typography className="text-secondaryTextColor w-full text-xs">

                                            {friend.username}
                                        </Typography>

                                        <Typography
                                            // eslint-disable-next-line react/prop-types
                                            style={{ display: friend.user_bio_view === 'everyone' ? 'block' : 'none' }}
                                            variant="small"
                                            className="text-secondaryTextColor w-52 break-all"
                                        >
                                            {friend.bio}
                                        </Typography>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <Button color='red' className='' onClick={() => handelDeleteFriend(friend.friendshipId)}>
                                        Delete Friend
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <h1>No friends</h1>
                )}
            </div>
        </div>
    );
}

export default FriendsComponent;
