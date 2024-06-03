import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImagesMessageImageSet, setShowAlertMessageImageSet, setVisibleMessageImageSet } from '../../slices/MessageImageSetSlice';

function MessageImageSetComponentAlert() {
  // local variables
  const dispatch = useDispatch();

  // redux states
  const theme = useSelector(state => state.theme.theme);
  const showAlert = useSelector(state => state.messageImageSet.showAlert);

  // refs
  const ImageSetComponentRef = useRef(null);

  // handlers
  const handleClose = () => {
    dispatch(setShowAlertMessageImageSet(false));
    dispatch(setImagesMessageImageSet([]));
    dispatch(setVisibleMessageImageSet(false));
  }
  const handelBack = () => {
    dispatch(setShowAlertMessageImageSet(false));
  }

  useEffect(() => {
    if (showAlert) {
      // Add animation class when showAlert becomes true
      ImageSetComponentRef.current.classList.add('fade-in');
    } else {
      // Remove animation class when showAlert becomes false
      ImageSetComponentRef.current.classList.remove('fade-in');
    }
  }, [showAlert]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center ${showAlert ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div ref={ImageSetComponentRef} className={`transition-opacity duration-300 transform ${theme === 'light' ? 'bg-white' : 'bg-[#23262b]'}  rounded-lg shadow-lg overflow-hidden p-8 text-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-auto mb-4" viewBox="0 0 16 16">
          <path d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 0h2v16H7V0zM3 0v16h2V0H3z" />
        </svg>
        <h1 className="text-xl font-bold text-gray-800">Discard unsent message?</h1>
        <p className="text-gray-600 text-base mt-4">Your message, including attached media, will not be sent if you leave this screen.</p>
        <div className="flex mt-8 space-x-4">
          <button onClick={handleClose} className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Discard
          </button>
          <button onClick={handelBack} className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
            Return to media
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageImageSetComponentAlert;
