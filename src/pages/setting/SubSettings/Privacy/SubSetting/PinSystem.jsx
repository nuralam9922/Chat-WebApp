import { Button, Input, Switch } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { HiStatusOnline } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../../../../selectors/userSelector';
import userService from '../../../../../services/userService';
import { setAlert } from '../../../../../slices/alertSlice';
import { updateUserDetails } from '../../../../../slices/authSlice';
import CryptoJS from 'crypto-js';

function PinSystem({ currentPrivacySetting, setCurrentPrivacySetting }) {
    const user = useSelector(selectUserDetails);
    const initialPinEnabled = user.settings.pin_enabled || false;
    const initialPinAskTime = user.settings.pin_ask_time || 20;

    const [pinEnabled, setPinEnabled] = useState(initialPinEnabled);
    const [pinAskTime, setPinAskTime] = useState(initialPinAskTime);
    const [userTypedPin, setUserTypedPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [error, setError] = useState('');
    const [verifyPin, setVerifyPin] = useState('');
    const dispatch = useDispatch();

    const [enterPinBox, setEnterPinBox] = useState(user.settings.pin === null ? false : true);

    const handleShowAlert = () => {
        dispatch(setAlert({ open: true, type: 'success', icon: <HiStatusOnline />, content: 'PIN system updated successfully!' }));
    };

    const handleVerifyPin = () => {
        const hashedVerifyPin = CryptoJS.SHA256(verifyPin).toString();
        if (hashedVerifyPin === user.settings.pin) {
            console.log('PIN verified');
            setEnterPinBox(false)
            setError('');
        } else {
            setError('Incorrect PIN');
        }
    };

    const handleCheckboxChange = async () => {
        setError('');

        if (pinEnabled && userTypedPin === '') {
            setError('PIN is required');
            return;
        }

        if (pinEnabled && userTypedPin.length < 4) {
            setError('PIN must be at least 4 characters long');
            return;
        }

        if (pinEnabled && (pinAskTime < 1 || pinAskTime > 10)) {
            setError('PIN ask time must be between 1 and 10 hours');
            return;
        }

        const hashedPin = pinEnabled ? CryptoJS.SHA256(userTypedPin).toString() : null;

        const isPinChanged = hashedPin !== user.settings.pin;
        const isPinEnabledChanged = pinEnabled !== initialPinEnabled;
        const isPinAskTimeChanged = pinAskTime !== initialPinAskTime;

        if (!isPinChanged && !isPinEnabledChanged && !isPinAskTimeChanged) {
            // handleShowAlert();
            return;
        }

        try {
            const response = await userService.updateUserDetails(user.id, {
                settings: {
                    pin_enabled: pinEnabled,
                    pin_ask_time: pinAskTime,
                    pin: hashedPin,
                },
            });

            if (response) {
                dispatch(updateUserDetails({
                    settings: {
                        ...user.settings,
                        pin_enabled: pinEnabled,
                        pin_ask_time: pinAskTime,
                        pin: hashedPin,
                    },
                }));
                handleShowAlert();
                setEnterPinBox(pinEnabled ? true : false);
                setUserTypedPin('');
                setVerifyPin('');
            }
        } catch (error) {
            console.log('Error in updating user PIN system', error);
            setError('Error in updating user PIN system');
        }
    };

    useEffect(() => {
        if (currentPrivacySetting !== 'Pin System') {
            // Reset state when the component hides
            setPinEnabled(initialPinEnabled);
            setPinAskTime(initialPinAskTime);
            setUserTypedPin('');
            setShowPin(false);
            setError('');
            setVerifyPin('');
            setEnterPinBox(user.settings.pin === null ? false : true);
        }
    }, [currentPrivacySetting, user.settings.pin_enabled, user.settings.pin_ask_time, user.settings.pin]);

    return (
        <div
            className={`absolute top-0 right-0 h-screen w-full bg-backgroundColor text-primaryTextColor z-[100] p-4 transition-transform duration-300 flex flex-col ${currentPrivacySetting === 'Pin System' ? 'flex' : 'hidden'
                }`}
        >
            <div className="w-full flex items-center justify-between mb-8">
                <div onClick={() => setCurrentPrivacySetting('') && setEnterPinBox(true)} className="cursor-pointer">
                    <BiLeftArrowAlt className="text-3xl" />
                </div>
                <h1 className="text-2xl font-bold">Pin System</h1>
            </div>

            {enterPinBox ? (
                <div className="flex flex-col gap-4">
                    <label className="text-xs py-2">Enter your PIN to manage settings:</label>
                    <Input
                        type="password"
                        value={verifyPin}
                        onChange={(e) => setVerifyPin(e.target.value)}
                        className="focus:border-blue-400"
                    />
                    {error && <p className='text-red-500 text-xs'>{error}</p>}
                    <Button onClick={handleVerifyPin} fullWidth className='mt-4 py-5'>
                        Verify PIN
                    </Button>
                    <label className='text-xs text-right mt-2 block text-linkColor cursor-pointer'>
                        Forget PIN
                    </label>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-lg">Enable PIN System</span>
                            <Switch checked={pinEnabled} onChange={(e) => setPinEnabled(e.target.checked)} />
                        </div>

                        {pinEnabled && (
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <label className="text-xs py-2 flex items-center justify-between">
                                        Enter New PIN:
                                        {showPin ? (
                                            <BsEye
                                                className='cursor-pointer text-lg'
                                                onClick={() => setShowPin(!showPin)}
                                            />
                                        ) : (
                                            <BsEyeSlash
                                                className='cursor-pointer text-lg'
                                                onClick={() => setShowPin(!showPin)}
                                            />
                                        )}
                                    </label>
                                    <Input
                                        type={showPin ? 'text' : 'password'}
                                        value={userTypedPin}
                                        onChange={(e) => setUserTypedPin(e.target.value)}
                                        className="focus:border-blue-400"
                                    />

                                </div>

                                <div>
                                    <label className="text-xs py-2">
                                        Ask for PIN again after (in hours):
                                    </label>
                                    <Input
                                        type="number"
                                        value={pinAskTime}
                                        onChange={(e) => setPinAskTime(e.target.value)}
                                        className="focus:border-blue-400"
                                        min={1}
                                        max={10}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <p className='text-red-500 text-xs'>{error}</p>}

                    <Button onClick={handleCheckboxChange} fullWidth className='mt-10 py-5'>
                        Submit
                    </Button>
                </>
            )}
        </div>
    );
}

export default PinSystem;
