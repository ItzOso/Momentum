import React, { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import DropdownInput from "../../common/DropdownInput";
function TaskForm({ project, title, subtitle, Icon, buttonText, setView }) {
  const [selectedStatus, setSelectedStatus] = useState(
    project?.taskStatuses?.[0]?.value
  );

  const handleStatusChange = (selectedOption) => {
    // The dropdown passes the full { value, label } object back.
    setSelectedStatus(selectedOption.value);
  };

  return (
    <div
      onClick={() => setView(false)}
      className="fixed inset-0 bg-black/80 flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card max-w-lg w-full flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bgGradient rounded-xl text-white flex items-center justify-center text-lg">
            <Icon />
          </div>
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-gray-600 text-sm">{subtitle}</p>
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
              <DropdownInput
                options={project?.taskStatuses}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Select a status..."
              />
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
            <button
              onClick={() => setView(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
