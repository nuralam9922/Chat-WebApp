import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setShowAddNewComponent } from "../../slices/showAddNewComponentSlice";
import { FiEdit } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import { Dropdown } from '../index'

const TopSection = () => {
    const [dropdown, setDropdown] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('Latest');
    const { theme } = useSelector(state => state.theme)

    const dispatch = useDispatch();

    return (
        <div className="flex-shrink-0 select-none">
            <div className="w-full flex justify-between items-center py-2">
                <h1 className="text-[23px] font-[700]">Chats</h1>
                <div className='flex items-center justify-center gap-3'>
                    <div onClick={() => setDropdown(prev => !prev)} className="relative">
                        <IoFilterOutline data-tooltip-id="my-tooltip" data-tooltip-content="Filter" className='text-lg cursor-pointer outline-none' />
                        <Dropdown options={['Oldest', 'Latest']} isOpen={dropdown} isClose={setDropdown} dropdownValue={dropdownValue} setDropdownValue={setDropdownValue} />
                    </div>
                    <div>
                        <FiEdit onClick={() => dispatch(setShowAddNewComponent(true))} data-tooltip-id="my-tooltip" data-tooltip-content="Add" className='text-lg cursor-pointer outline-none' />
                    </div>

                </div>
            </div>


            {/* search bar  */}
            <div className="w-full relative h-[45px]">
                <svg className="absolute top-1/2 left-3 size-[17px] transform -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8815 10.8817C10.9574 10.8055 11 10.7025 11 10.595C11 10.4875 10.9574 10.3845 10.8815 10.3083L7.96103 7.38889C8.5294 6.69132 8.83911 5.81869 8.83769 4.91889C8.83651 3.8799 8.42325 2.88379 7.68858 2.14912C6.95391 1.41444 5.95782 1.00118 4.91884 1C3.87986 1.00118 2.88377 1.41444 2.1491 2.14912C1.41443 2.88379 1.00118 3.8799 1 4.91889C1.00118 5.95788 1.41443 6.95398 2.1491 7.68866C2.88377 8.42334 3.87986 8.8366 4.91884 8.83778C5.81864 8.8392 6.69125 8.52948 7.38881 7.96111L10.3093 10.8817C10.3851 10.9573 10.4878 10.9999 10.5949 11C10.6481 11.0001 10.7008 10.9897 10.75 10.9694C10.7992 10.9491 10.8439 10.9193 10.8815 10.8817ZM8.02714 4.91889C8.02626 5.74285 7.69855 6.53281 7.11593 7.11544C6.5333 7.69807 5.74335 8.02578 4.9194 8.02667C4.09535 8.02593 3.30525 7.69829 2.72251 7.11564C2.13977 6.53299 1.81198 5.74295 1.8111 4.91889C1.81198 4.09493 2.13969 3.30496 2.72231 2.72233C3.30494 2.1397 4.09489 1.81199 4.91884 1.81111C5.74289 1.81185 6.53299 2.13949 7.11573 2.72214C7.69848 3.30478 8.02626 4.09483 8.02714 4.91889Z"
                        fill="#676767"
                        stroke="#676767"
                        strokeWidth="0.5"
                    />
                </svg>

                <input
                    style={{
                        backgroundColor: theme === 'light' ? '#EFEFEF' : '#212121',
                    }}
                    type="search"
                    className="w-full  h-full rounded-[12px] indent-10 outline-none focus:border focus:border-blue-400 duration-200 appearance-none"
                    placeholder="Search..."
                    name=""
                    id=""
                />
            </div>

        </div>
    );
};


export default TopSection