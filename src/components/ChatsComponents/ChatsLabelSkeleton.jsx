import React from 'react'

const MessageLabelSkeleton = () => (
    <div className="min-h-[36px] flex-shrink-0 py-3 md:px-5 rounded-md bg-gray-200 animate-pulse w-full flex items-center justify-between cursor-pointer">
        <div className="flex items-start gap-4">
            <div className="userAvatar size-14 bg-gray-300 rounded-full h-10 w-10"></div>
            <div className="flex flex-col gap-2">
                <div className="userName bg-gray-300 rounded h-4 w-24"></div>
                <div className="minMessagePreview bg-gray-300 rounded h-3 w-32"></div>
            </div>
        </div>
        <div className="h-full flex flex-col items-end justify-between">
            <div className="bg-gray-300 rounded h-3 w-16"></div>
            <div className="bg-gray-300 rounded-full h-5 w-5 mt-2"></div>
        </div>
    </div>
);
export default MessageLabelSkeleton