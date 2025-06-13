import React from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";

function TaskForm() {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
      <div className="card max-w-lg w-full flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bgGradient rounded-xl text-white flex items-center justify-center text-lg">
            <FaPlus />
          </div>
          <div>
            <p className="text-lg font-bold">Create New Task</p>
            <p className="text-gray-600 text-sm">
              Add a new task to your project.
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="taskTitle"
              className="text-sm font-medium text-gray-600"
            >
              Task Title *
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter task title"
              id="taskTitle"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="taskDesc"
              className="text-sm font-medium text-gray-600"
            >
              Description (Optional)
            </label>
            <textarea
              type="text"
              className="input resize-none h-24"
              placeholder="Describe your task in detail"
              id="taskDesc"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="taskStatus"
                className="text-sm font-medium text-gray-600"
              >
                Status
              </label>
              <button type="button" className="input text-start">
                To Do
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="taskDueDate"
                className="text-sm font-medium text-gray-600"
              >
                Due Date (Optional)
              </label>
              <input type="date" className="input" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
