import React, { useState } from "react";
import DropdownInput from "../../common/DropdownInput";
import { FaPlus, FaTrash } from "react-icons/fa";

const PRIORITY_OPTIONS = [
  { value: "high", label: "High Priority", color: "red" },
  { value: "medium", label: "Medium Priority", color: "yellow" },
  { value: "low", label: "Low Priority", color: "blue" },
];

function TaskForm({
  project,
  title,
  subtitle,
  Icon,
  buttonText,
  setView,
  onSubmitFunction,
  initialValues,
}) {
  const [formData, setFormData] = useState(() => ({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    status: initialValues?.status ?? (project?.taskStatuses?.[0]?.value || ""),
    priority: initialValues?.priority ?? "medium",
    checklist: initialValues?.checklist ?? [],
    dueDate: initialValues?.dueDate
      ? (() => {
          // Handle Firebase Timestamp (seconds, nanoseconds)
          if (
            typeof initialValues.dueDate === "object" &&
            initialValues.dueDate.seconds
          ) {
            const date = new Date(initialValues.dueDate.seconds * 1000);
            return date.toISOString().slice(0, 10);
          }
          // If already a string or Date
          if (typeof initialValues.dueDate === "string") {
            return initialValues.dueDate;
          }
          if (initialValues.dueDate instanceof Date) {
            return initialValues.dueDate.toISOString().slice(0, 10);
          }
          return "";
        })()
      : "",
  }));

  const [newChecklistItem, setNewChecklistItem] = useState("");

  const handleTitleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleDueDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: value,
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      status: selectedOption.value,
    }));
  };

  const handlePriorityChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      priority: selectedOption.value,
    }));
  };

  const addChecklistItem = (e) => {
    e.preventDefault();
    if (!newChecklistItem.trim()) return;

    setFormData((prev) => ({
      ...prev,
      checklist: [
        ...prev.checklist,
        { text: newChecklistItem.trim(), completed: false },
      ],
    }));
    setNewChecklistItem("");
  };

  const removeChecklistItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const toggleChecklistItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmitFunction(formData);
      setFormData({
        title: "",
        description: "",
        status: project?.taskStatuses?.[0]?.value || "",
        priority: "medium",
        checklist: [],
        dueDate: "",
      });
      setView(false);
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  return (
    <div
      onClick={() => setView(false)}
      className="fixed z-50 inset-0 bg-black/80 flex justify-center items-center p-4"
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="taskTitle"
              className="text-sm font-medium text-gray-600"
            >
              Task Title *
            </label>
            <input
              onChange={(e) => handleTitleChange(e.target.value)}
              value={formData.title}
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
              onChange={(e) => handleDescriptionChange(e.target.value)}
              value={formData.description}
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
                value={formData.status}
                onChange={handleStatusChange}
                placeholder="Select a status..."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="taskPriority"
                className="text-sm font-medium text-gray-600"
              >
                Priority
              </label>
              <DropdownInput
                options={PRIORITY_OPTIONS}
                value={formData.priority}
                onChange={handlePriorityChange}
                placeholder="Select priority..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Checklist
            </label>
            <div className="space-y-2">
              {formData.checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(index)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <p
                    className={`flex-1 text-sm ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(index)}
                    className="text-red-500 hover:text-red-600 transition-all duration-200"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  placeholder="Add a new item"
                  className="input text-sm py-1.5 flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addChecklistItem(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addChecklistItem}
                  disabled={!newChecklistItem.trim()}
                  className="btn-primary"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="taskDueDate"
              className="text-sm font-medium text-gray-600"
            >
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleDueDateChange(e.target.value)}
              className="input"
              id="taskDueDate"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setView(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              disabled={!formData.title}
              type="submit"
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

export default TaskForm;
