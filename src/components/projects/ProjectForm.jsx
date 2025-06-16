import React, { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";

function ProjectForm({
  setView,
  onSubmitFunction,
  formTitle = "Create New Project",
  formSubtitle = "Add a new project to start organizing your tasks.",
  buttonText = "Create Project",
  ButtonIcon = FaFolderPlus,
  initialValues = { title: "", description: "" },
}) {
  const [title, setTitle] = useState(initialValues?.title);
  const [description, setDescription] = useState(initialValues?.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmitFunction(title, description);
      setTitle("");
      setDescription("");
      setView(false);
    } catch (error) {
      console.log("Error creating project:", error);
    }
  };

  return (
    <div
      onClick={() => setView(false)}
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card max-w-lg w-full flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bgGradient rounded-xl text-white flex items-center justify-center text-lg">
            <ButtonIcon />
          </div>
          <div>
            <p className="text-lg font-bold">{formTitle}</p>
            <p className="text-gray-600 text-sm">{formSubtitle}</p>
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
            <button
              type="button"
              onClick={() => setView(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title?.trim()}
              className="btn-primary"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
