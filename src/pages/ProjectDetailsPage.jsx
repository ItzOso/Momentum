import React, { useEffect, useState } from "react";
import ProjectBoard from "../components/projects/ProjectBoard/ProjectKanbanBoard";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProjectTask,
  getProject,
  getProjectTasks,
} from "../firebase/projectsService";
import ProjectNotFound from "../components/projects/ProjectBoard/ProjectNotFound";
import Spinner from "../components/common/Spinner";
import TaskForm from "../components/projects/tasks/TaskForm";
import { FaPlus } from "react-icons/fa";
import ProjectHeader from "../components/projects/ProjectHeader";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthProvider";
import { useProjects } from "../contexts/ProjectsProvider";
import { TasksProvider, useTasks } from "../contexts/TasksProvider";
import ProjectStatCards from "../components/projects/ProjectStatCards";
import ProjectTasksList from "../components/projects/ProjectBoard/ProjectListBoard";
import ProjectListBoard from "../components/projects/ProjectBoard/ProjectListBoard";
import ProjectKanbanBoard from "../components/projects/ProjectBoard/ProjectKanbanBoard";

function ProjectDetailsPage() {
  const [createTaskIsOpen, setCreateTaskIsOpen] = useState(false);
  const [tab, setTab] = useState("kanban");

  const { currentUser } = useAuth();
  const { projects, loading: isLoadingProjects } = useProjects();

  const { id: projectId } = useParams();

  const project = projects.find((p) => p.id === projectId);

  const handleCreateTask = async (formData) => {
    try {
      await createProjectTask(currentUser.uid, projectId, formData); // returns newly created task and its id in an object
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task. Please try again.");
      console.log(error);
    }
  };

  if (isLoadingProjects)
    return (
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
        <Spinner />
      </div>
    );

  if (!project) return <ProjectNotFound />;
  return (
    <TasksProvider projectId={projectId}>
      <ProjectHeader
        project={project}
        setCreateTaskIsOpen={setCreateTaskIsOpen}
      />
      <div className="max-w-7xl space-y-8 px-4 mx-auto py-8">
        <ProjectStatCards project={project} />

        <div className="card p-2 gap-2 grid grid-cols-1 sm:grid-cols-2">
          <button
            onClick={() => setTab("kanban")}
            className={` h-8 ${
              tab != "kanban"
                ? "btn-secondary border-none text-gray-500"
                : "btn-primary"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setTab("list")}
            className={` h-8 ${
              tab != "list"
                ? "btn-secondary border-none text-gray-500"
                : "btn-primary"
            }`}
          >
            List
          </button>
        </div>

        {tab === "kanban" ? (
          <ProjectKanbanBoard project={project} />
        ) : (
          <ProjectListBoard project={project} />
        )}

        {createTaskIsOpen && (
          <TaskForm
            project={project}
            setView={setCreateTaskIsOpen}
            title="Create New Task"
            subtitle="Add a new task to your project."
            Icon={FaPlus}
            buttonText="Create Task"
            onSubmitFunction={handleCreateTask}
          />
        )}
      </div>
    </TasksProvider>
  );
}

export default ProjectDetailsPage;
