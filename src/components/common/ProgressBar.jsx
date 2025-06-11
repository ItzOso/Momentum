import React from "react";

function ProgressBar({ className = "", progress = 0 }) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full mt-1 ${className}`}>
      <div
        style={{ width: `${progress}%` }}
        className="h-full bgGradient rounded-full"
      ></div>
    </div>
  );
}

export default ProgressBar;
