/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BsEmojiDizzy, BsEmojiSmile, BsSend } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setActiveChatId } from '../../slices/chatWindowSlice';
import EmojiPickerComponent from '../EmojiPickerComponent';

// eslint-disable-next-line react/prop-types
const MessageInput = () => {
  const textareaRef = useAutoResizeTextarea();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  // Redux states
  const chats = useSelector(state => state.chats);
  const user = useSelector(selectUserDetails);
  const chatWindowInfo = useSelector(state => state.chatWindowInfo);

  // Initial variables
  const loggedInUserId = user.id;
  const friendId = chatWindowInfo.userInfo.id;
  let chatId = chatWindowInfo.activeChatId || null;

  const dispatch = useDispatch();
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
  };

  return (
    <div className="w-full absolute bottom-0 flex items-center bg-backgroundColor shadow-md p-2 bg-">
      {showEmoji && <EmojiPickerComponent  setText={setText} setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
      <div className="flex w-full items-end border-2 border-green-500 rounded-lg p-1 overflow-hidden">
        <div className="flex items-center space-x-2 md:px-2 py-3 md:p-2">
          <div className="cursor-pointer">
            <GrAttachment className="text-xl" />
          </div>
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
        <button style={{
          marginRight: text.length > 0 ? '0px' : '-50px',
          visibility: text.length > 0 ? 'visible' : 'hidden'
        }} onClick={handleNewMessage} className="flex items-center justify-center cursor-pointer p-[0.6rem] duration-200">
          <BsSend className="text-green-500 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
