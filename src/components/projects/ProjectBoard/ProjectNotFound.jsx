import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ProjectNotFound() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-300 text-3xl text-red-600 flex justify-center items-center">
          <MdErrorOutline />
        </div>
        <div>
          <p className="text-2xl font-bold">Project not found</p>
          <p className="text-gray-600 mt-1">
            This project may have been deleted or doesn't exist.
          </p>
        </div>
        <button className="btn-primary mx-auto" onClick={() => navigate("/")}>
          <FaArrowLeft />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ProjectNotFound;
