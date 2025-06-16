import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

import { FaPlus } from "react-icons/fa";
import ProjectForm from "../components/projects/ProjectForm";
import toast from "react-hot-toast";

import { Timestamp } from "firebase/firestore";

import { createProject, getUserProjects } from "../firebase/projectsService";

import ProjectList from "../components/projects/ProjectList";
import UserStatCards from "../components/dashboard/UserStatCards";
import SectionHeader from "../components/common/SectionHeader";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../contexts/ProjectsProvider";

function HomePage() {
  const { currentUser } = useAuth();
  const [createProjectIsOpen, setCreateProjectIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleCreateProject = async (title, description) => {
    try {
      const newProjectData = await createProject(currentUser.uid, {
        // returns the newly created note and its id in an object
        title: title.trim(),
        description: description.trim(),
      });
      navigate(`/project/${newProjectData.id}`);
      toast.success("Project created successfully!");
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
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
      <UserStatCards />

      <SectionHeader
        title="Your Projects"
        subtitle="Manage and track your project progress"
        buttonText="New Project"
        ButtonIcon={FaPlus}
        onButtonClick={() => setCreateProjectIsOpen(true)}
        align="between"
      />

      <ProjectList setCreateProjectIsOpen={setCreateProjectIsOpen} />

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
