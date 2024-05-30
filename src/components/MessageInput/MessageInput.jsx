/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BsEmojiDizzy } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea ';
import EmojiPickerComponent from '../EmojiPickerComponent';
import { useDispatch } from 'react-redux';
import messageService from '../../services/messageService';
import { useSelector } from 'react-redux';
import { setActiveChatId } from '../../slices/chatWindowSlice';

// eslint-disable-next-line react/prop-types
const MessageInput = ({ user, chatWindowInfo }) => {
  const textareaRef = useAutoResizeTextarea();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');
  const chats = useSelector(state => state.chats);

  const loggedInUserId = user.id;
  const friendId = chatWindowInfo.userInfo.id
  let chatId = chatWindowInfo.activeChatId || null


  // if (chatId === null) {
  //   chatId = checkUserAlreadyExist[0].chatId
  // }


  const dispatch = useDispatch();
  const handelNewMessage = async () => {
    if (text, loggedInUserId, friendId) {
      const checkUserAlreadyExist = chats.chats.filter((chat) => chat.friendInfo.id === friendId)
      if (checkUserAlreadyExist.length > 0 && chatId === null) {
        dispatch(setActiveChatId(checkUserAlreadyExist[0].chatId));
        chatId = checkUserAlreadyExist[0].chatId
      }

      console.log(chatId);
      await messageService.sendMessage(loggedInUserId, friendId, chatId, text)
    }
  }

  return (
    <div className="w-full h-auto flex flex-col md:flex-row px-2 md:px-4 items-end md:items-end lg:gap-1 md:gap-4 justify-between bg-backgroundColor shadow-md mb-3 md:mb-0 lg:py-3">
      <div className="w-full md:w-fit h-full flex items-end  justify-start">
        <div className=" items-end justify-between gap-2 mb-2 md:mb-0 h-full hidden">
          <div className="min-h-10  rounded-md flex items-center p-3 px-4 justify-center flex-shrink-0 border cursor-pointer">
            <GrAttachment className="text-primaryTextColor text-xl" />
          </div>

        </div>
      </div>
      {showEmoji && <EmojiPickerComponent setText={setText} setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
      <div className="flex items-end gap-3 w-full relative">
        <div onClick={() => setShowEmoji(!showEmoji)} className=" min-h-10  flex items-center p-3  justify-center  cursor-pointer absolute bottom-0">
          <BsEmojiDizzy className="text-xl text-yellow-400" />
        </div>
        <textarea
          ref={textareaRef}
          onChange={e => setText(e.target.value)}
          value={text}
          className="w-full min-h-10 max-h-60 bg-transparent placeholder:text-xs placeholder:md:text-base p-3 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition duration-200 resize-none overflow-y-auto pl-14"
          placeholder="Type your message here..."
          name="messageInput"
          id="messageInput"
          rows={1}
        />
        <button onClick={handelNewMessage} className="text-xs p-1 px-4 md:p-2 min-h-12 md:px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 mt-2 md:mt-0" type="button">
          Enter
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
