import { useState } from 'react';
import fileIcon from '../../assets/fileIcon.svg';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea ';
import EmojiPickerComponent from '../EmojiPickerComponent';
import { BsEmojiDizzy } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';

const MessageInput = () => {
  const textareaRef = useAutoResizeTextarea();
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="w-full h-auto flex flex-col md:flex-row px-2 md:px-4 items-end md:items-end gap-1 md:gap-4 justify-between bg-backgroundColor shadow-md py-3">
      
      <div className="w-full md:w-fit h-full">
        <div className="flex items-start justify-start gap-2 mb-2 md:mb-0 h-full">
          <div className="w-14 border rounded-md bg-blue-gray-50 h-10 lg:h-full flex items-center justify-center cursor-pointer">
            <GrAttachment className='text-black' />
          </div>
          <div onClick={() => setShowEmoji(!showEmoji)} className="h-10 lg:h-full rounded-md flex items-center p-3 px-4 justify-center flex-shrink-0 border cursor-pointer">
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
