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
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { createProject, getUserProjects } from "../firebase/projectsService";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectList from "../components/projects/ProjectList";
import UserStatCards from "../components/UserStatCards";

function HomePage() {
  const { currentUser } = useAuth();
  const [createProjectIsOpen, setCreateProjectIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsFetchingProjects(true);
      try {
        const userProjects = await getUserProjects(currentUser.uid);
        setProjects(userProjects);
      } catch (error) {
        toast.error("Failed to fetch projects. Try reloading page.");
      } finally {
        setIsFetchingProjects(false);
      }
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
      // create client timestamp because serverTimestamp() takes to long(do this for immediate client feedback)
      setProjects((prevProjects) => [
        {
          ...newProjectData,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        },
        ...prevProjects,
      ]);
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
      <UserStatCards projects={projects} />

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

      <ProjectList
        isFetchingProjects={isFetchingProjects}
        projects={projects}
        setCreateProjectIsOpen={setCreateProjectIsOpen}
      />

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
