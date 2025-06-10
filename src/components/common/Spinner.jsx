import React from "react";

function Spinner({ size = "12" }) {
  return (
    <div
      style={{ width: `calc(${size}*4px)`, height: `calc(${size}*4px)` }}
      className={`animate-spin inline-block border-4 border-primary border-t-transparent rounded-full`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
