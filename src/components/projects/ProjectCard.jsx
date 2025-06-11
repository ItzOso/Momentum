import React from "react";
import { FaRegCalendar, FaRegFolderOpen } from "react-icons/fa";
import ProgressBar from "../common/ProgressBar";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const totalTasks = project?.tasksCount || 0;
  const tasksDone = project?.tasksDoneCount || 0;
  const progress =
    totalTasks > 0 ? Math.floor((tasksDone / totalTasks) * 100) : 0;
  return (
    <div
      className="card space-y-6 cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="flex justify-between">
        <p className="font-bold">{project?.title}</p>
        <div className="w-10 h-10 bgGradient rounded-2xl text-white flex items-center justify-center text-lg">
          <FaRegFolderOpen />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Progress</p>
          <p>{`${progress}%`}</p>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-1">
            <div className="rounded-full bg-gray-500 w-2 h-2"></div>
            <p className="text-sm text-gray-500">{`${totalTasks} tasks`}</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div className="rounded-full bg-green-500 w-2 h-2"></div>
            <p className="text-sm text-gray-500">{`${tasksDone} done`}</p>
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
