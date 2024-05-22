import React, { useEffect, useRef } from 'react'

const Dropdown = React.memo(({ isOpen = true, isClose, options = [], dropdownValue, setDropdownValue }) => {
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
      className={`absolute top-7 left-0 z-[999]  border w-full flex flex-col bg-backgroundColor rounded-lg shadow-lg duration-300 overflow-hidden transition-all ${
        isOpen ? 'max-h-40 opacity-100 select-none' : 'max-h-0 opacity-0'
      }`}
    >
      {options?.map(
        (option, index) => (
          console.log(dropdownValue),
          (
            <div
              key={index}
              onClick={() => {
                setDropdownValue(option);
                isClose(false);
              }}
              className={`w-full h-12 px-4 flex items-center cursor-pointer ${option === dropdownValue ? 'bg-blue-100' : ''} hover:bg-gray-100 transition-colors duration-200`}
            >
              <span className="text-gray-700">{option}</span>
            </div>
          )
        )
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown'

export default Dropdown
