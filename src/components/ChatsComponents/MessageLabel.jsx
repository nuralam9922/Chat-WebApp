import { data } from "autoprefixer";
import { formatTime } from "../../utils/formatTime";
import ImageComponent from "../ImageComponent";

const MessageLabel = ({ handleClick, chat }) => {

    const imageUr = chat.friendInfo.user_profile_view === 'everyone' && chat.friendInfo.profile_picture_url
    const name = chat.friendInfo.full_name;
    const userName = chat.friendInfo.username;
    // Parse the timestamp to a Date object

    return (
        <div
            onClick={() => handleClick(chat)}
            className="min-h-[36px] flex-shrink-0 py-3 md:px-5 rounded-md hover:bg-stone-200 duration-300 w-full flex items-center justify-between cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <div className="userAvatar size-10 sm:size-16  flex-shrink-0">
                    <ImageComponent imageUrl={imageUr} className={'w-full h-full rounded-full object-cover'} />
                </div>
                <div>
                    <div className="userName font-[700]">{name}</div>
                    {/* <div className="userName font-[300] text-xs text-secondaryTextColor">{userName}</div> */}
                    <div className="minMessagePreview text-secondaryTextColor text-xs">
                        {chat.last_message.length > 20 ? chat.last_message.slice(0, 25) + '...' : chat.last_message}
                    </div>
                    <div
                        style={{
                            display: 'none',
                        }}
                        className="isTyping text-green-500"
                    >
                        ...IsTyping
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col items-end justify-between flex-shrink-0">
                <p className="text-secondaryTextColor text-xs md:text-base">{formatTime(chat.last_message_timestamp)}</p>
                <img
                    style={{
                        display: 'none',
                    }}
                    // src={singleTck}
                    alt=""
                />
                {chat.unreadCount > 1 && <div className="size-[20px] w-auto p-1 rounded-full bg-green-600 flex items-center justify-center text-white ">{chat.unreadCount}</div>}
            </div>
        </div>
    );
};

export default MessageLabel