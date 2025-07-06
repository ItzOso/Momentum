import React, { useEffect, useRef } from "react";

function DropdownShell({ trigger, children, isOpen, setIsOpen }) {
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
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-1 card p-1 z-20"
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Add default props for backward compatibility
DropdownShell.defaultProps = {
  isOpen: undefined,
  setIsOpen: undefined,
};

export default DropdownShell;
