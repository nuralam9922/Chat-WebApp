import { useEffect, useRef, useState } from 'react';
import { HiCheck, HiDuplicate, HiTrash } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from '../../selectors/userSelector';
import messageService from '../../services/messageService';
import { setShowMessageDropdown } from '../../slices/messageDropdown';

export default function MessageDropdown() {
    // local states
    const [copied, setCopied] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);

    // redux stats
    const dispatch = useDispatch();
    const { showDropdown } = useSelector((state) => state.messageDropdown);
    const { messageDetails } = useSelector((state) => state.messageDropdown);
    const { positionX, positionY } = useSelector((state) => state.messageDropdown);
    const theme = useSelector((state) => state.theme.theme);
    const chatId = useSelector((state) => state.chatWindowInfo.activeChatId);
    const loggedInUser = useSelector(selectUserDetails);
    const chatWindowInfo = useSelector((state) => state.chatWindowInfo.userInfo);

    //  refs
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dispatch(setShowMessageDropdown(false));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    // functions
    const handelClick = async (value) => {
        if (value === 'Copy') {
            clearTimeout(timeoutRef.current);
            navigator.clipboard.writeText(messageDetails.message);
            setCopied(true);
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);
            dispatch(setShowMessageDropdown(false));
        } else if (value === 'Delete for me') {
            // if messageDetails notDeletedBy not included friend id then we assume that the massage is deleted by the friend
            const checkFriendUserIsAlreadyDeletedMessage = !messageDetails.notDeletedBy.includes(chatWindowInfo.id);
            messageService.deleteMessageForUser(loggedInUser.id, chatId, messageDetails.id, checkFriendUserIsAlreadyDeletedMessage);
            dispatch(setShowMessageDropdown(false));
        } else if (value === 'Delete for Everyone') {
            // Delete for Everyone message
            messageService.deleteForEveryone(chatId, messageDetails.id);
            dispatch(setShowMessageDropdown(false));
        }
    };

    const reactionOptions = ['😊', '❤️', '👍', '🥰'];

    const handleReaction = (reaction) => {
        messageService.addReactionToMessage(chatId, messageDetails.id, chatWindowInfo.id, reaction);
        dispatch(setShowMessageDropdown(false));
        console.log(chatId, messageDetails.id, chatWindowInfo.id, reaction);
    };


    console.log(messageDetails);

    return (
        <div style={{ top: `${positionY - 220}px`, left: `${positionX - 100}px` }} className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#23262b] text-white'}  w-72 rounded-lg overflow-hidden shadow-xl fixed  transition-all duration-300 ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`} ref={dropdownRef}>
            <ul className="text-xl">
                <DropdownItem fun={handelClick} icon={<HiDuplicate className="w-4 h-4 mr-3" />} text={copied ? 'Copied!' : 'Copy'} />
                <DropdownItem fun={handelClick} icon={<HiTrash className="w-4 h-4 mr-3" />} text="Delete for me" />
                {!messageDetails?.deletedForEveryone && messageDetails?.sender_id === loggedInUser.id && <DropdownItem fun={handelClick} icon={<MdDelete className="w-4 h-4 mr-3" />} text="Delete for Everyone" />}
                <DropdownItem fun={() => setShowEmojis(!showEmojis)} icon={<HiCheck className="w-4 h-4 mr-3" />} text="Select" />
            </ul>
            <div className="max-h-10 flex items-center justify-between w-full my-2 px-4 ">
                {!messageDetails?.deletedForEveryone && reactionOptions.map((emoji, index) => (
                    <div key={index} onClick={() => handleReaction(emoji)} className="rounded-full hover:bg-[#444444] text-xl flex items-center justify-center hover:text-2xl duration-200 cursor-pointer m-1 p-1" >
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    );
}

function DropdownItem({ icon, text, fun }) {
    return (
        <li onClick={() => fun(text)} className={`flex items-center px-4 py-2 hover:bg-[#444444] hover:text-white  cursor-pointer`}>
            {icon}
            {text}
        </li>
    );
}
