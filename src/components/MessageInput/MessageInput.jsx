import { useState } from 'react';
import { BsEmojiDizzy } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea ';
import EmojiPickerComponent from '../EmojiPickerComponent';

const MessageInput = () => {
  const textareaRef = useAutoResizeTextarea();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="w-full h-auto flex flex-col md:flex-row px-2 md:px-4 items-end md:items-end lg:gap-1 md:gap-4 justify-between bg-backgroundColor shadow-md mb-3 md:mb-0 lg:py-3">
      <div className="w-full md:w-fit h-full flex items-end  justify-start">
        <div className="flex items-end justify-between gap-2 mb-2 md:mb-0 h-full ">
          <div className="min-h-10  rounded-md flex items-center p-3 px-4 justify-center flex-shrink-0 border cursor-pointer">
            <GrAttachment className="text-primaryTextColor text-xl" />
          </div>
          <div onClick={() => setShowEmoji(!showEmoji)} className="min-h-10  rounded-md flex items-center p-3 px-4 justify-center flex-shrink-0 border cursor-pointer">
            <BsEmojiDizzy className="text-xl text-yellow-400" />
          </div>
        </div>
      </div>
      {showEmoji && <EmojiPickerComponent setText={setText} setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
      <div className="flex items-end gap-3 w-full">
        <textarea
          ref={textareaRef}
          onChange={e => setText(e.target.value)}
          value={text}
          className="w-full min-h-10 max-h-60 bg-transparent placeholder:text-xs placeholder:md:text-base p-3 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition duration-200 resize-none overflow-y-auto"
          placeholder="Type your message here..."
          name="messageInput"
          id="messageInput"
          rows={1}
        />
        <button className="text-xs p-1 px-4 md:p-2 min-h-12 md:px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 mt-2 md:mt-0" type="button">
          Enter
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
