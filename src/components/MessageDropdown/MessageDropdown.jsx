import { useEffect, useRef } from 'react';
import { HiReply, HiDuplicate, HiSave, HiShare, HiTrash, HiCheck, HiArrowNarrowRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessageDropdown } from '../../slices/messageDropdown';

export default function MessageDropdown({ theme = 'light' }) {
    const dispatch = useDispatch();
    const { showDropdown } = useSelector((state) => state.messageDropdown);
    const { position } = useSelector((state) => state.messageDropdown);
    const dropdownRef = useRef(null);

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

    return (
        <div className={`bg-[#333333] text-white w-48 rounded-md shadow-lg fixed top-1/2  right-32  -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}  ref={dropdownRef}>
            <ul className="text-sm">
                <DropdownItem icon={<HiReply className="w-4 h-4 mr-3" />} text="Reply" />
                <DropdownItem icon={<HiDuplicate className="w-4 h-4 mr-3" />} text="Copy" />
                <DropdownItem icon={<HiSave className="w-4 h-4 mr-3" />} text="Save as..." />
                <DropdownItem icon={<HiArrowNarrowRight className="w-4 h-4 mr-3" />} text="Forward" />
                <DropdownItem icon={<HiCheck className="w-4 h-4 mr-3" />} text="Select" />
                <DropdownItem icon={<HiTrash className="w-4 h-4 mr-3" />} text="Delete for me" />
                <DropdownItem icon={<HiCheck className="w-4 h-4 mr-3" />} text="Select" />
                <DropdownItem icon={<HiShare className="w-4 h-4 mr-3" />} text="Share" />
            </ul>
        </div>
    );
}

function DropdownItem({ icon, text }) {
    return (
        <li className="flex items-center px-4 py-2 hover:bg-[#444444] cursor-pointer">
            {icon}
            {text}
        </li>
    );
}
