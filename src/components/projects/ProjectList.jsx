import React from "react";
import { FaPlus, FaRegFolderOpen } from "react-icons/fa";
import Spinner from "../common/Spinner";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../contexts/ProjectsProvider";

function ProjectList({ setCreateProjectIsOpen }) {
  const { projects, loading } = useProjects();

  return (
    <div>
      {loading ? (
        <div className="w-fit mx-auto mt-36">
          <Spinner />
        </div>
      ) : projects.length != 0 ? (
        // if they have at least 1 project
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        // if they dont have any projects yet
        <div className="border-gray-300 bg-gray-50 border-2 border-dashed w-full py-14 rounded-lg">
          <div className="max-w-md mx-auto space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bgGradient rounded-full text-white flex items-center justify-center text-3xl">
              <FaRegFolderOpen />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">No projects yet</p>
              <p className="text-gray-600">
                Get started by creating your first project. Organize your tasks
                and track your progress in real-time.
              </p>
            </div>
            <button
              onClick={() => setCreateProjectIsOpen(true)}
              className="btn-primary mx-auto"
            >
              <FaPlus />
              Create Your First Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
