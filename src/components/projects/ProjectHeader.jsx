import React, { useState } from "react";
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
import ActionMenu from "../common/ActionMenu";
import toast from "react-hot-toast";
import { deleteProject, updateProject } from "../../firebase/projectsService";
import ProjectForm from "./ProjectForm";
import { useTasks } from "../../contexts/TasksProvider";
import ConfirmActionModal from "../common/ConfirmActionModal";

function ProjectHeader({ project, setCreateTaskIsOpen }) {
  const { tasks, loading: isLoadingTasks } = useTasks();
  const navigate = useNavigate();
  const totalTasks = project?.tasksCount || 0;
  const tasksDone = project?.tasksDoneCount || 0;
  const progress =
    totalTasks > 0 ? Math.floor((tasksDone / totalTasks) * 100) : 0;
  const [updateProjectIsOpen, setUpdateProjectIsOpen] = useState(false);

  const [isConfirmDeleteProjectOpen, setIsConfirmDeleteProjectOpen] =
    useState(false);

  const handleUpdateProject = async (title, description) => {
    try {
      await updateProject(project.id, {
        title: title.trim(),
        description: description.trim(),
      });
      toast.success("Successfully updated project");
    } catch (error) {
      toast.error("Failed to update project. Please try again.");
    }
  };

  const actionButtons = [
    {
      ButtonIcon: IoSettingsOutline,
      buttonText: "Project Settings",
      isDestructable: false,
      onClick: () => {
        setUpdateProjectIsOpen(true);
      },
    },
    {
      ButtonIcon: FaRegTrashCan,
      buttonText: "Delete Project",
      isDestructable: true,
      onClick: () => {
        setIsConfirmDeleteProjectOpen(true);
      },
    },
  ];

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id, tasks);
      navigate("/");
      toast.success("Successfully deleted project");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  return (
    <div className="shadow-xs bg-white">
      <div className="h-[64px] flex items-center justify-between max-w-7xl px-4 mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn-secondary hover:bg-gray-100 border-none"
          >
            <FaArrowLeft />
            <p className="hidden sm:block">Back</p>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <p className="font-bold text-xl line-clamp-1">{project.title}</p>
          <p className="hidden sm:block py-1 px-3 whitespace-nowrap bg-gradient-to-r from-primary/25 to-secondary/25 text-purple-700 border border-purple-200 rounded-2xl text-xs font-medium">
            {`${progress}% Complete`}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setCreateTaskIsOpen(true)}
            className="btn-primary"
          >
            <FaPlus />
            <p className="hidden sm:block">New Task</p>
          </button>
          <DropdownShell
            trigger={
              <button type="button" className="btn-secondary">
                <FaEllipsis />
              </button>
            }
          >
            <ActionMenu actions={actionButtons} />
          </DropdownShell>
        </div>
      </div>

      {updateProjectIsOpen && (
        <ProjectForm
          setView={setUpdateProjectIsOpen}
          formTitle="Edit Project"
          formSubtitle="Update your project details below."
          ButtonIcon={IoSettingsOutline}
          buttonText="Update Project"
          initialValues={{
            title: project.title,
            description: project.description,
          }}
          onSubmitFunction={handleUpdateProject}
        />
      )}

      {isConfirmDeleteProjectOpen && (
        <ConfirmActionModal
          title="Are you sure you want to delete this project?"
          subtitle="Note: All tasks will be lost"
          buttonText="Yes, Delete"
          setView={setIsConfirmDeleteProjectOpen}
          onButtonClick={handleDeleteProject}
        />
      )}
    </div>
  );
}

export default ProjectHeader;
