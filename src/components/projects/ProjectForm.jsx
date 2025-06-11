import React, { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";

function ProjectForm({ isOpen, setView, onSubmitFunction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmitFunction(title, description);
      setTitle("");
      setDescription("");
      setView(false);
    } catch (error) {
      console.log("Error creating projcet:", error);
    }
  };

  return (
    <div
      onClick={() => setView(false)}
      className="fixed inset-0 bg-black/80 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card max-w-lg w-full flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bgGradient rounded-xl text-white flex items-center justify-center text-lg">
            <FaFolderPlus />
          </div>
          <div>
            <p className="text-lg font-bold">Create New Project</p>
            <p className="text-gray-600 text-sm">
              Add a new project to start organizing your tasks.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="projectTitle"
              className="text-sm font-medium text-gray-600"
            >
              Project Name *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input"
              placeholder="Enter project name"
              id="projectTitle"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="projectDesc"
              className="text-sm font-medium text-gray-600"
            >
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="input resize-none h-24"
              placeholder="Describe your project goals and objectives"
              id="projectDesc"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setView(false)} className="btn-secondary">
              Cancel
            </button>
            <button disabled={!title.trim()} className="btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
