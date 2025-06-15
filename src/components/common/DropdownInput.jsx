import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function DropdownInput({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClickOption = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options?.find((option) => option.value === value);
  return (
    <div className="w-full relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="input flex justify-between items-center w-full"
      >
        {selectedOption ? selectedOption?.label : placeholder}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 card p-1 w-full flex flex-col gap-1"
        >
          {options?.map((option) => (
            <button
              onClick={() => handleClickOption(option)}
              type="button"
              className="text-left text-sm hover:bg-gray-100 px-8 py-2 rounded-lg relative"
              key={option.value}
            >
              {selectedOption?.value === option.value && (
                <FaCheck className="absolute top-1/2 -translate-y-1/2 left-2" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownInput;
