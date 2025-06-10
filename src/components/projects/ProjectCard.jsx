import React from "react";
import { FaRegCalendar, FaRegFolderOpen } from "react-icons/fa";

function ProjectCard() {
  return (
    <div className="card space-y-6">
      <div className="flex justify-between">
        <p className="font-bold">Test Project</p>
        <div className="w-10 h-10 bgGradient rounded-2xl text-white flex items-center justify-center text-lg">
          <FaRegFolderOpen />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Progress</p>
          <p>0%</p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div className="h-full w-2/6 bgGradient rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-1">
            <div className="rounded-full bg-gray-500 w-2 h-2"></div>
            <p className="text-sm text-gray-500">2 tasks</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div className="rounded-full bg-green-500 w-2 h-2"></div>
            <p className="text-sm text-gray-500">2 tasks</p>
          </div>
        </div>
        <p className="text-xs font-medium text-gray-500 flex items-center justify-center gap-1">
          <FaRegCalendar />
          6/5/2025
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
