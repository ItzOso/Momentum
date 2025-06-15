import React, { useEffect, useState } from "react";
import ProjectBoard from "../components/projects/ProjectBoard/ProjectBoard";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, getProjectTasks } from "../firebase/projectsService";
import ProjectNotFound from "../components/projects/ProjectBoard/ProjectNotFound";
import Spinner from "../components/common/Spinner";
import TaskForm from "../components/projects/tasks/TaskForm";
import { FaPlus } from "react-icons/fa";
import ProjectHeader from "../components/projects/ProjectHeader";

function ProjectDetailsPage() {
  const [isFetchingProject, setIsFetchingProject] = useState(false);
  const [createTaskIsOpen, setCreateTaskIsOpen] = useState(false);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchProject = async () => {
      setIsFetchingProject(true);
      try {
        const projectData = await getProject(id);
        if (projectData) {
          setProject(projectData);
          const projectTasks = await getProjectTasks(projectData.id);
          if (projectTasks.length != 0) {
            setTasks(projectTasks);
          } else {
            setTasks(null);
          }
        } else {
          setProject(null);
        }
      } catch (error) {
        console.log("An fetching project:", error);
        setProject(null);
      } finally {
        setIsFetchingProject(false);
      }
    };
    fetchProject();
  }, [id]);

  if (isFetchingProject)
    return (
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
        <Spinner />
      </div>
    );

  if (!project) return <ProjectNotFound />;
  return (
    <div>
      <ProjectHeader
        project={project}
        setCreateTaskIsOpen={setCreateTaskIsOpen}
      />
      <div className="max-w-7xl space-y-8 px-4 mx-auto py-8">
        <ProjectBoard project={project} tasks={tasks} />
        {createTaskIsOpen && (
          <TaskForm
            project={project}
            setView={setCreateTaskIsOpen}
            title="Create New Task"
            subtitle="Add a new task to your project."
            Icon={FaPlus}
            buttonText="Create Task"
          />
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
