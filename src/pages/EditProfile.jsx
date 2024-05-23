import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FiEdit, FiEdit2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../selectors/userSelector';
import userService from '../services/userService';
import { updateUserDetails } from '../slices/authSlice';
import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { Alert } from '@material-tailwind/react';
import { selectThemeDetails } from '../selectors/themeSelector';



function EditProfile({ onNextStep }) {

  const user = useSelector(selectUserDetails);
  const theme = useSelector(selectThemeDetails);
  const dispatch = useDispatch();
  // how to get path of the usrl last path 
  const path = window.location.pathname.split('/').pop();

  const [profileImage, setProfileImage] = useState(user?.profile_picture_url?.imageUrl || null);
  const [name, setName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [about, setAbout] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [enableSaveChangesButton, setEnableSaveChangesButton] = useState(false);
  useEffect(() => {
    const isChanged =
      profileImage !== user?.profile_picture_url?.imageUrl ||
      name !== user?.full_name ||
      about !== user?.bio || username !== user?.username;


    setEnableSaveChangesButton(isChanged);
  }, [profileImage, name, username, about, user]);


  const handleImageChange = e => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handelShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username) {
      setError('please choose a  username');
      return;
    }
    // create a regex for identify username startWith @
    if (!username.startsWith('@')) {
      setError('username must start with @');
      return;
    }
    const usernameWithoutAt = username.slice(1);
    if (!/^[A-Za-z0-9_]+$/.test(usernameWithoutAt)) {
      setError('username can only contain letters, numbers, and underscores');
      return;
    }
    if (username.length < 3) {
      setError('username must be at least 3 characters long');
      return;
    }

    try {
      setLoading(true);
      if (user.username !== username) {
        const existUsername = await userService.checkUserNameExists(username)

        if (existUsername) {
          setError('username already exists');
          setLoading(false);
          return
        }
      }

      const response = await userService.updateUserDetails(user.id, { profile_picture_url: { imageUrl: profileImage }, full_name: name, username, bio: about });
      if (response === true) {
        setLoading(false);
        dispatch(updateUserDetails({ profile_picture_url: { imageUrl: profileImage, imageId: user?.profile_picture_url?.imageId }, full_name: name, username, bio: about }));
        setError(null);
        handelShowAlert()
        if (profileImage, name, username, about) {
          onNextStep && onNextStep();
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  console.log(theme);

  return (
    <>
      <Alert
        color={theme === "dark" ? "green" : "blue"}
        // icon={<Icon />}
        icon={<FiEdit2 />}
        // variant="outlined"

        open={showAlert}
        onClose={() => setShowAlert(false)}
        className={`rounded-none border-l-4 border-[#2ec946] ${theme === "dark" ? " text-white" : ""} font-medium absolute`}

      >
        Profile updated successfully
      </Alert>
      <div className="flex text-textPrimaryColor flex-col items-center justify-center md:p-10 b  h-full w-full">
        <div className=" shadow-md rounded-lg p-6 w-full md:max-w-md ">

          <h2 className="text-2xl font-bold text-center mb-6 text-primaryTextColor">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-col items-center w-full">
              <label className="cursor-pointer">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <FiEdit size={32} />
                    </div>
                  )}
                </div>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
              <span className="text-gray-600 mt-2">Change Profile Picture</span>
            </div>
            <div>
              <Input type="text" label="Name" color="blue" size="lg" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <Typography variant="small" className="mb-2 text-xs text-secondaryTextColor font-normal">
                Please choose a unique username starting with "@"
              </Typography>
              <Input type="text" label="Username" color="blue" size="lg" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <Textarea type="text" label="About" color="blue" size="lg" placeholder="About" value={about} onChange={e => setAbout(e.target.value)} required />
            </div>
            {error && <p className="text-red-500 text-xs capitalize">{error}</p>}
            <div className="flex justify-center w-full">


              {loading ? (
                <Button loading={true}>Loading</Button>

              ) : (
                <Button disabled={!enableSaveChangesButton} type="submit" color="blue" className='w-full'>
                  Save Changes
                </Button>
              )}

            </div>
          </form>
        </div>
      </div></>
  );
}

export default EditProfile;
