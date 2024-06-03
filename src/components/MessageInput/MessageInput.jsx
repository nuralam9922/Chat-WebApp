import { useEffect, useRef, useState } from 'react';
import { BiVideo } from 'react-icons/bi';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { ImImages } from 'react-icons/im';
import { RiFileList3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setActiveChatId } from '../../slices/chatWindowSlice';
import { setImagesMessageImageSet, setVisibleMessageImageSet } from '../../slices/MessageImageSetSlice';
import EmojiPickerComponent from '../EmojiPickerComponent';
import MessageImageSetComponent from '../MessageImageSetComponent/MessageImageSetComponent';

// eslint-disable-next-line react/prop-types
const MessageInput = () => {
  const textareaRef = useAutoResizeTextarea();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showMessageSetComponent, setShowMessageSetComponent] = useState(false);
  // Redux states
  const chats = useSelector(state => state.chats);
  const user = useSelector(selectUserDetails);
  const chatWindowInfo = useSelector(state => state.chatWindowInfo);
  const theme = useSelector(state => state.theme.theme);
  const messageImageSet = useSelector(state => state.messageImageSet);

  // Initial variables
  const loggedInUserId = user.id;
  const friendId = chatWindowInfo.userInfo.id;
  let chatId = chatWindowInfo.activeChatId || null;

  // refs
  const timeoutRef = useRef(null);
  const attachmentContainerRef = useRef(null);

  const dispatch = useDispatch();

  // handlers
  const handleNewMessage = async () => {
    if (text !== '' && loggedInUserId && friendId) {
      setText('');
      textareaRef.current.focus();

      if (chatId === null) {
        const checkChatAlreadyExist = chats.chats.filter((chat) => chat.friendInfo.id === friendId);
        if (checkChatAlreadyExist.length > 0) {
          dispatch(setActiveChatId(checkChatAlreadyExist[0].chatId));
          chatId = checkChatAlreadyExist[0].chatId;
          await messageService.sendMessage(loggedInUserId, friendId, chatId, text);
        } else {
          const newlyCreatedChatid = await messageService.sendMessage(loggedInUserId, friendId, chatId, text);
          dispatch(setActiveChatId(newlyCreatedChatid));
        }
      } else {
        await messageService.sendMessage(loggedInUserId, friendId, chatId, text);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNewMessage();
    }
    if (chatId) {
      if (!isTyping) {
        setIsTyping(true);
        messageService.setTypingStatus(chatId, loggedInUserId);
      }
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        messageService.removeTypingStatus(chatId, loggedInUserId);
      }, 1000);
    }
  };

  const handleShowAttachment = () => {
    setShowAttachment(!showAttachment);
  };

  const handelImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileMetadata = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));

    dispatch(setImagesMessageImageSet(fileMetadata)); // Store only file metadata
    dispatch(setVisibleMessageImageSet(true));
  };



  // useEffects
  useEffect(() => {
    const outsideClickAttachment = (e) => {
      if (attachmentContainerRef.current && !attachmentContainerRef.current.contains(e.target)) {
        setShowAttachment(false);
      }
    };
    document.addEventListener('mousedown', outsideClickAttachment);
    return () => {
      document.removeEventListener('mousedown', outsideClickAttachment);
    };

  }, [])

  return (
    <>
      <div className="w-full absolute bottom-0 flex items-center bg-backgroundColor shadow-md ">
        {showEmoji && <EmojiPickerComponent setText={setText} setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
        <div className="flex w-full items-end border-t-2 border-green-500  px-2 overflow-hidden ">
          <div className="flex items-center space-x-2 md:px-2 py-3 md:p-2">
            <GrAttachment onClick={handleShowAttachment} className="md:text-xl cursor-pointer" />
            <div onClick={() => setShowEmoji(!showEmoji)} className="cursor-pointer hidden lg:flex">
              <BsEmojiSmile className="text-xl text-yellow-700" />
            </div>
          </div>
          <textarea
            ref={textareaRef}
            onChange={e => setText(e.target.value)}
            value={text}
            className="flex-1 h-full max-h-40 bg-transparent placeholder:text-xs md:placeholder:text-sm p-2 border-none outline-none resize-none overflow-y-auto"
            placeholder="Type a message..."
            name="messageInput"
            id="messageInput"
            rows={1}
            onKeyPress={handleKeyPress}
          />
          <button
            style={{
              marginRight: text.length > 0 ? '0px' : '-50px',
              visibility: text.length > 0 ? 'visible' : 'hidden'
            }}
            onClick={handleNewMessage}
            className="flex items-center justify-center cursor-pointer p-[0.6rem] duration-200"
          >
            <BsSend className="text-green-500 text-xl" />
          </button>
        </div>
        {showAttachment && <div ref={attachmentContainerRef} className={`absolute bottom-14 left-0 w-52  rounded-md ${theme === "light" ? `bg-white` : 'bg-[#23262b]'} `}>
          <div className={`w-full relative h-10 ${theme === 'light' ? 'hover:bg-blue-gray-50' : 'hover:hover:bg-[#444444]'}  cursor-pointer px-5 flex gap-2 items-center`}><ImImages /> <label htmlFor="Image">Image</label>
            <input type="file" onChange={handelImageChange} className='w-full absolute opacity-0' id="img" name="img" accept="image/*" multiple="multiple" />
          </div>
          <div className={`w-full h-10 ${theme === 'light' ? 'hover:bg-blue-gray-50' : 'hover:hover:bg-[#444444]'}  cursor-pointer px-5 flex gap-2 items-center`}><BiVideo /> Video</div>
          <div className={`w-full h-10 ${theme === 'light' ? 'hover:bg-blue-gray-50' : 'hover:hover:bg-[#444444]'}  cursor-pointer px-5 flex gap-2 items-center`}><RiFileList3Line /> File</div>
        </div>}
      </div>
      {messageImageSet.visible && <MessageImageSetComponent />}

    </>
  );
};

export default MessageInput;
