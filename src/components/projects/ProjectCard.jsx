import React from "react";
import {
  FaRegCalendar,
  FaRegFolderOpen,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import ProgressBar from "../common/ProgressBar";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { updateProject } from "../../firebase/projectsService";
import toast from "react-hot-toast";

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const totalTasks = project?.tasksCount || 0;
  const tasksDone = project?.tasksDoneCount || 0;
  const progress =
    totalTasks > 0 ? Math.floor((tasksDone / totalTasks) * 100) : 0;

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the star
    try {
      await updateProject(project.id, {
        isFavorite: !project.isFavorite,
      });
      toast.success(
        project.isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  return (
    <div
      className="card hover:shadow-lg transition-all space-y-6 cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="font-bold">{project?.title}</p>
          <button
            onClick={toggleFavorite}
            className="hover:scale-110 transition-transform text-yellow-500"
          >
            {project.isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
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
          {formatDate(project?.updatedAt) || "loading..."}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
