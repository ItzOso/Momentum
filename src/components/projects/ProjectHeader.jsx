import React from "react";
import { FaPlus } from "react-icons/fa";
import {
  FaArrowLeft,
  FaEllipsis,
  FaGear,
  FaRegTrashCan,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DropdownShell from "../common/DropdownShell";
import { GoGear } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

function ProjectHeader({ project, setCreateTaskIsOpen }) {
  const navigate = useNavigate();
  const totalTasks = project?.tasksCount || 0;
  const tasksDone = project?.tasksDoneCount || 0;
  const progress =
    totalTasks > 0 ? Math.floor((tasksDone / totalTasks) * 100) : 0;
  return (
    <div className="shadow-xs bg-white">
      <div className="h-[64px] flex items-center justify-between max-w-7xl px-4 mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn-secondary hover:bg-gray-100 border-none"
          >
            <FaArrowLeft />
            Back
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <p className="font-bold text-xl">{project.title}</p>
          <p className="py-1 px-3 bg-gradient-to-r from-primary/25 to-secondary/25 text-purple-700 border border-purple-200 rounded-2xl text-xs font-medium">
            {`${progress}% Complete`}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setCreateTaskIsOpen(true)}
            className="btn-primary"
          >
            <FaPlus />
            New Task
          </button>
          <DropdownShell
            trigger={
              <button type="button" className="btn-secondary">
                <FaEllipsis />
              </button>
            }
          >
            <div className="flex flex-col gap-1 w-48">
              <button className="text-sm hover:bg-gray-100 rounded-lg p-2 flex items-center gap-4">
                <IoSettingsOutline /> Project Settings
              </button>
              <button className="text-sm text-red-600 hover:bg-gray-100 rounded-lg p-2 flex items-center gap-4">
                <FaRegTrashCan /> Delete Project
              </button>
            </div>
          </DropdownShell>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;
