import { FaFileCircleMinus } from 'react-icons/fa6';
import useAutoResizeTextarea from '../../hooks/useAutoResizeTextarea ';
import fileIcon from '../../assets/fileIcon.svg';
const MessageInput = () => {
  const textareaRef = useAutoResizeTextarea();

  return (
    <div className="w-full border-t h-auto flex px-2 md:px-4 items-end gap-1 md:gap-4 justify-between bg-gray-50 border-gray-200 shadow-md py-3">
      <div className="w-14 rounded-md bg-slate-200 min-h-10 flex items-center justify-center cursor-pointer p-3">
        <img src={fileIcon} className="w-6 h-6" alt="File Icon" />
        {/* <FaFileCircleMinus /> */}
      </div>
      <textarea
        ref={textareaRef}
        className="w-full min-h-10 max-h-60 bg-transparent placeholder:text-xs placeholder:md:text-base p-3 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition duration-200 resize-none overflow-y-auto"
        placeholder="Type your message here..."
        name="messageInput"
        id="messageInput"
        rows={1}
      />
      <button className="text-xs p-1 px-4 md:p-2 min-h-12 md:px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200" type="button">
        Enter
      </button>
    </div>
  );
};

export default MessageInput;
