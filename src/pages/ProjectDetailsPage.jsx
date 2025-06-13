import React, { useEffect, useState } from "react";
import ProjectBoard from "../components/projects/ProjectBoard/ProjectBoard";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, getProjectTasks } from "../firebase/projectsService";
import ProjectNotFound from "../components/projects/ProjectBoard/ProjectNotFound";
import Spinner from "../components/common/Spinner";
import TaskForm from "../components/projects/tasks/TaskForm";

function ProjectDetailsPage() {
  const [isFetchingProject, setIsFetchingProject] = useState(false);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchProject = async () => {
      setIsFetchingProject(true);
      try {
        const projectData = await getProject(id);
        console.log(projectData);
        if (projectData) {
          setProject(projectData);
          const projectTasks = await getProjectTasks(projectData.id);
          console.log(projectTasks);
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
    <div className="max-w-7xl space-y-8 px-4 mx-auto py-8">
      <ProjectBoard project={project} tasks={tasks} />
      <TaskForm />
    </div>
  );
}

export default ProjectDetailsPage;
