import React, { useEffect, useRef } from 'react'

const Dropdown = React.memo(({ isOpen = false, isClose, options = [], dropdownValue, setDropdownValue }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        isClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isClose]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-7 right-0 z-[999]  border w-72 flex flex-col bg-backgroundColor rounded-lg shadow-lg duration-300 overflow-hidden transition-all ${
        isOpen ? 'max-h-40 opacity-100 select-none' : 'max-h-0 opacity-0'
      }`}
    >
      {options?.map(
        (option, index) => (
          
          (
            <div
              key={index}
              onClick={() => {
                isClose(false);
                setDropdownValue(option);
              }}
              className={`w-full h-12 px-4 flex items-center cursor-pointer ${option === dropdownValue ? 'bg-blue-gray-300 text-white ' : ''} hover:bg-blue-gray-400 hover:text-white text-primaryTextColor  transition-colors duration-200`}
            >
              <span className="">{option}</span>
            </div>
          )
        )
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown'

export default Dropdown
