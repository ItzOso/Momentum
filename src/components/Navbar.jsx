import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const { currentUser, signout } = useAuth();
  return (
    <div className="shadow-xs bg-white">
      <div className="h-[64px] flex items-center justify-between max-w-7xl px-4 mx-auto">
        <Link to="/" className="flex gap-3 items-center">
          <div className="bgGradient rounded-lg text-white w-10 h-10 flex items-center justify-center">
            <FaBoltLightning />
          </div>
          <p className="textGradient font-bold text-2xl">Momentum.</p>
        </Link>
        <div>
          {currentUser ? (
            <div className="flex gap-4 items-center">
              <div className="hidden sm:flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-gray-100">
                <div className="rounded-full bg-green-500 animate-pulse w-2 h-2"></div>
                <p className="text-sm text-gray-600 font-medium">
                  {currentUser.email.split("@")[0]}
                </p>
              </div>
              <button onClick={signout} className="btn-secondary  ">
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin" className="btn-primary  ">
              <FaSignInAlt />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
