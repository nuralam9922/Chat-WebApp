import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import { PiPlusBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea';
import { setShowAlertMessageImageSet } from '../../slices/MessageImageSetSlice';
import ImageComponent from '../ImageComponent';
import MessageImageSetComponentAlert from './MessageImageSetComponentAlert';
import './style.css'

function MessageImageSetComponent() {



    const [text, setText] = useState('');

    // local states
    const dispatch = useDispatch();

    // refs
    const ImageSetComponentRef = useRef(null);

    // custom hook
    const textareaRef = useAutoResizeTextarea();

    // Redux states
    const theme = useSelector(state => state.theme.theme);
    const messageImageSet = useSelector(state => state.messageImageSet);
    useEffect(() => {
        if (!messageImageSet.visible) {
            return
        }
    }, [messageImageSet.visible])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ImageSetComponentRef.current && !ImageSetComponentRef.current.contains(event.target)) {
                // Dispatch your action only if the click occurred outside the component
                dispatch(setShowAlertMessageImageSet(true));
                console.log('clicked outside');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dispatch]); // Added dispatch as a dependency to useEffect



    return (
        <div className={`w-full h-screen  bg-transparent absolute `}>
            <div ref={ImageSetComponentRef} className={`absolute bottom-0 left-0 w-[30rem] min-h-96  rounded-md ${theme === "light" ? `bg-white` : 'bg-[#23262b]'} gap-5 flex flex-col justify-between p-2 rounded-md `}>
                <div>
                    <ImageComponent className={`w-full h-72  object-cover`} imageUrl={''} />
                </div>
                {/* plus icon */}
                <div className='w-full flex items-center justify-between'>
                    <div className="w-10 h-10 rounded-md bg-slate-400 overflow-hidden relative flex items-center justify-center bg-backgroundColor flex-shrink-0 border-2">
                        <PiPlusBold />
                        <input type="text" className='w-full absolute opacity-0' name="" id="" />
                    </div>


                    <div className='w-full flex items-center justify-center overflow-y-scroll gap-2'>
                        <div className="w-10 h-10 rounded-md bg-slate-400 overflow-hidden bg-blue-gray-200 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-md bg-slate-400 overflow-hidden bg-blue-gray-200 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-md bg-slate-400 overflow-hidden bg-blue-gray-200 cursor-pointer"></div>
                        <div className="w-10 h-10 rounded-md bg-slate-400 overflow-hidden bg-blue-gray-200 cursor-pointer"></div>
                    </div>
                </div>

                {/* input field with emoji icon */}

                <div className='relative w-full rounded-md overflow-hidden'>
                    <div className="cursor-pointer absolute bottom-[19px] left-2">
                        <BsEmojiSmile className="text-xl text-yellow-700" />
                    </div>
                    <textarea
                        ref={textareaRef}
                        onChange={e => setText(e.target.value)}
                        value={text}
                        className=" h-full w-full bg-backgroundColor border-2    placeholder:text-xs md:placeholder:text-sm p-2 rounded-md outline-none resize-none overflow-y-auto px-10"
                        placeholder="Type a Caption..."
                        name="captionInput"
                        id="captionInput"
                        rows={1}
                    // onKeyPress={handleKeyPress}
                    />
                    <button

                        className="flex items-center justify-center  p-[0.6rem] duration-200 cursor-pointer absolute bottom-2 right-2 "
                    >
                        <BsSend className="text-green-500 text-xl" />
                    </button>
                </div>
            </div>
            <MessageImageSetComponentAlert />

        </div>
    )
}

export default MessageImageSetComponent