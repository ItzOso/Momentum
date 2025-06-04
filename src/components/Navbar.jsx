import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const { currentUser, signout } = useAuth();
  return (
    <div className="border-b border-gray-200 shadow-xs bg-white">
      <div className="h-[64px] flex items-center justify-between max-w-7xl px-4 mx-auto">
        <div className="flex gap-3 items-center">
          <div className="bgGradient rounded-lg text-white w-10 h-10 flex items-center justify-center">
            <FaBoltLightning />
          </div>
          <p className="textGradient font-bold text-2xl">Momentum.</p>
        </div>
        {currentUser ? (
          <button onClick={signout} className="btn-secondary btn-icon">
            <FaSignOutAlt />
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="btn-primary btn-icon">
            <FaSignInAlt />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
