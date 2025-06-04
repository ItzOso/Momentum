import React from "react";

function Spinner({ size = "12" }) {
  return (
    <div
      className={`animate-spin inline-block w-${size} h-${size} border-4 border-primary border-t-transparent rounded-full"
      role="status`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
