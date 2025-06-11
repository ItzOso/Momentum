import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import StatCard from "../components/common/StatCard";
import {
  FaChartLine,
  FaClock,
  FaFolderOpen,
  FaPlus,
  FaRegCheckCircle,
  FaRegClock,
  FaRegFolderOpen,
} from "react-icons/fa";
import ProjectForm from "../components/projects/ProjectForm";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { createProject, getUserProjects } from "../firebase/projectsService";
import ProjectCard from "../components/projects/ProjectCard";

function HomePage() {
  const { currentUser } = useAuth();
  const [createProjectIsOpen, setCreateProjectIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const userProjects = await getUserProjects(currentUser.uid);
      setProjects(userProjects);
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (title, description) => {
    try {
      const newProjectData = await createProject(currentUser.uid, {
        // returns the newly created note and its id in an object
        title,
        description,
      });
      setProjects((prevProjects) => [newProjectData, ...prevProjects]);
      toast.success("Project created successfully!");
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
      throw error;
    }
  };
  return (
    <div className="max-w-7xl space-y-8 px-4 mx-auto py-8">
      {/* Header welcome text */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-center">{`Welcome back, ${
          currentUser.email.split("@")[0]
        }! 👋
          `}</h2>
        <p className="text-gray-600 text-xl text-center">
          Ready to make progress? Here's what's happening with your projects.
        </p>
      </div>

      {/* User stats cards(total projects, total tasks, completed projects, competion rate) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          stat="0"
          color="blue"
          Icon={FaRegFolderOpen}
        />
        <StatCard
          title="Total Tasks"
          stat="0"
          color="purple"
          Icon={FaRegClock}
        />
        <StatCard
          title="Completed"
          stat="0"
          color="green"
          Icon={FaRegCheckCircle}
        />
        <StatCard
          title="Completion Rate"
          stat="0%"
          color="orange"
          Icon={FaChartLine}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">Your Projects</p>
          <p className="text-gray-600 mt-1">
            Manage and track your project progress
          </p>
        </div>
        <button
          onClick={() => setCreateProjectIsOpen(true)}
          className="btn-primary  "
        >
          <FaPlus />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {createProjectIsOpen && (
        <ProjectForm
          isOpen={createProjectIsOpen}
          setView={setCreateProjectIsOpen}
          onSubmitFunction={handleCreateProject}
        />
      )}
    </div>
  );
}

export default HomePage;
