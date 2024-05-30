/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BsEmojiDizzy, BsSend } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea';
import EmojiPickerComponent from '../EmojiPickerComponent';
import { useDispatch } from 'react-redux';
import messageService from '../../services/messageService';
import { useSelector } from 'react-redux';
import { setActiveChatId } from '../../slices/chatWindowSlice';
import { Button } from '@material-tailwind/react';

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
    if (text !== '' && loggedInUserId && friendId) {
      setText('')
      textareaRef.current.focus()
      const checkUserAlreadyExist = chats.chats.filter((chat) => chat.friendInfo.id === friendId)
      if (checkUserAlreadyExist.length > 0 && chatId === null) {
        dispatch(setActiveChatId(checkUserAlreadyExist[0].chatId));
        chatId = checkUserAlreadyExist[0].chatId
      }

      await messageService.sendMessage(loggedInUserId, friendId, chatId, text);

    }
  }

  return (
    <div className="w-full  absolute bottom-0 lg:bottom-0 flex flex-col md:flex-row px-2 md:px-4 items-end md:items-end lg:gap-1 md:gap-4 justify-between bg-transparent shadow-md mb-1 lg:py-3 ">
      <div className="w-full md:w-fit h-full flex items-end  justify-start">
        <div className=" items-end justify-between gap-2 mb-2 md:mb-0 h-full hidden">
          <div className="min-h-10  rounded-md flex items-center p-3 px-4 justify-center flex-shrink-0 border cursor-pointer">
            <GrAttachment className="text-primaryTextColor text-xl" />
          </div>

        </div>
      </div>
      {showEmoji && <EmojiPickerComponent setText={setText} setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
      <div className="flex items-end gap-1 w-full relative">
        <div onClick={() => setShowEmoji(!showEmoji)} className=" min-h-10  flex items-center p-3  justify-center  cursor-pointer absolute bottom-0">
          <BsEmojiDizzy className="text-xl text-yellow-700" />
        </div>
        <textarea
          ref={textareaRef}
          onChange={e => setText(e.target.value)}
          value={text}
          className="w-full min-h-10 max-h-60 bg-transparent placeholder:text-xs placeholder:md:text-base p-3 px-4 border-2 border-green-500 rounded-lg outline-none focus:border-blue-500 transition duration-200 resize-none overflow-y-auto pl-14"
          placeholder="Type your message here..."
          name="messageInput"
          id="messageInput"
          rows={1}
        />
        <Button onClick={handelNewMessage} color='green' className='min-h-10  p-4 px-5 pt-5 flex items-center justify-center focus:outline-1 focus:outline-blue-400'><BsSend /></Button>
      </div>
    </div>
  );
};

export default MessageInput;
