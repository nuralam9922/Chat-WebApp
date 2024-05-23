import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ImageComponent from '../components/ImageComponent';
import ProgressComponent from '../components/ProgressComponent';
import useUserUploadProfilePicture from '../hooks/useUserUploadProfilePicture';
import { selectThemeDetails } from '../selectors/themeSelector';
import { selectUserDetails } from '../selectors/userSelector';
import userService from '../services/userService';
import { setAlert } from '../slices/alertSlice';
import { updateUserDetails } from '../slices/authSlice';



function EditProfile({ onNextStep }) {

  const user = useSelector(selectUserDetails);
  const theme = useSelector(selectThemeDetails);
  const dispatch = useDispatch();

  const path = window.location.pathname.split('/').pop();

  const [profileImage, setProfileImage] = useState(user?.profile_picture_url?.imageUrl || null);
  const [profile_picture_Local, setProfile_picture_Local] = useState(null);
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

  const { uploadImage, uploading, error: uploadError, uploadPercentage } = useUserUploadProfilePicture();

  const handleImageChange = async e => {
    try {
      const downloadURL = await uploadImage(e.target.files[0]);
      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handelShowAlert = () => {
    dispatch(setAlert({ open: true, type: 'success', icon: <BiEdit/> , content: 'profile update successfully!!' }))
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

  return (
    <>
      <div className="flex text-textPrimaryColor overflow-y-scroll py-20 flex-col items-center justify-center md:p-10 b  h-full w-full">
        <div className=" shadow-md rounded-lg p-6 w-full md:max-w-md ">

          <h2 className="text-2xl font-bold text-center mb-6 text-primaryTextColor">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-col items-center w-full">
              <label className="cursor-pointer relative">
                <div className=" w-32 h-32 rounded-full overflow-hidden bg-gray-200 relative">
                  {profileImage ? (
                    <ImageComponent className={'w-full h-full object-cover'} imageUrl={profileImage} imageAlt={name} />

                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <FiEdit size={32} />
                    </div>
                  )}
                </div>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
              {uploading && <ProgressComponent value={uploadPercentage} />}
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
            {error && <p className="text-red-500 text-xs capitalize">{error || uploadError}</p>}
            <div className="flex justify-center w-full">


              {loading ? (
                <Button loading={true}>Loading</Button>

              ) : (
                <Button disabled={!enableSaveChangesButton || uploading} type="submit" color="blue" className='w-full'>
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
