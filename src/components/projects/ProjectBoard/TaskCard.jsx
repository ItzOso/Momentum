import React, { useState } from "react";
import DropdownShell from "../../common/DropdownShell";
import { FaEllipsis, FaRegClock, FaRegTrashCan } from "react-icons/fa6";
import ActionMenu from "../../common/ActionMenu";
import { FaRegEdit } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import DropdownInput from "../../common/DropdownInput";
import toast from "react-hot-toast";
import {
  deleteTask,
  updateProjectTask,
} from "../../../firebase/projectsService";
import ConfirmActionModal from "../../common/ConfirmActionModal";
import TaskForm from "../tasks/TaskForm";

function TaskCard({ task, project, forList = false }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const { title, description, status, dueDate } = task;
  const [currentStatus, setCurrentStatus] = useState(status);
  const handleStatusChange = async (selectedOption) => {
    try {
      setCurrentStatus(selectedOption.value);
      if (currentStatus != selectedOption.value) {
        await updateProjectTask(project.id, task.id, {
          status: selectedOption.value,
        });
        toast.success("Successfully moved task");
      }
    } catch (error) {
      toast.error("Failed to move task. Please try again.");
    }
  };
  const actionButtons = [
    {
      ButtonIcon: FaRegEdit,
      buttonText: "Edit Task",
      isDestructable: false,
      onClick: () => {
        setIsEditTaskOpen(true);
      },
    },
    {
      ButtonIcon: FaRegTrashCan,
      buttonText: "DeleteTask",
      isDestructable: true,
      onClick: () => {
        setIsConfirmDeleteOpen(true);
      },
    },
  ];

  const handleUpdateTask = async (updates) => {
    try {
      await updateProjectTask(project.id, task.id, updates);
      toast.success("Successfully updated task");
    } catch (error) {
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(project.id, task.id);
      toast.success("Successfully deleted task");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const styleOptions = {
    gray: {
      border: "border-l-gray-500",
      count: "bg-gray-100 text-gray-700 border border-gray-200",
    },
    blue: {
      border: "border-l-blue-500",
      count: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    green: {
      border: "border-l-green-500",
      count: "bg-green-100 text-green-700 border border-green-200",
    },
  };

  const style =
    task.status === "todo"
      ? styleOptions.gray
      : task.status === "in_progress"
      ? styleOptions.blue
      : styleOptions.green;
  // Find the status object from project.statuses that matches the task's status value
  const statusObj = project?.taskStatuses?.find((s) => s.value === task.status);

  return (
    <div
      className={`card ${
        forList ? `border-l-4 ${style.border}` : "p-4"
      } hover:shadow-md transition-all `}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <p className={`font-semibold  ${forList ? "text-lg" : "text-sm"}`}>
            {title}
          </p>
          {forList && (
            <p
              className={`py-1 px-3 ${style.count} rounded-2xl text-xs font-medium`}
            >
              {statusObj?.label || currentStatus}
            </p>
          )}
        </div>
        <DropdownShell
          trigger={
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
              <FaEllipsis />
            </button>
          }
        >
          <div className="space-y-1">
            <DropdownInput
              options={project?.taskStatuses}
              value={currentStatus}
              onChange={handleStatusChange}
              placeholder="Select a status..."
            />
            <ActionMenu actions={actionButtons} />
          </div>
        </DropdownShell>
      </div>
      <p className={`${!forList && "text-sm"} text-gray-600 line-clamp-2`}>
        {description}
      </p>
      {dueDate && (
        <p
          className={`flex items-center gap-1 ${
            forList ? "text-sm" : "text-xs"
          } text-gray-600 mt-2`}
        >
          <FaRegClock />
          {dueDate.toDate().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}

      {isConfirmDeleteOpen && (
        <ConfirmActionModal
          title="Are you sure you want to delete this task?"
          buttonText="Yes, Delete"
          setView={setIsConfirmDeleteOpen}
          onButtonClick={handleDeleteTask}
        />
      )}

      {isEditTaskOpen && (
        <TaskForm
          project={project}
          Icon={FaRegEdit}
          buttonText="Update Task"
          subtitle="Update your task details below."
          title="Edit Task"
          setView={setIsEditTaskOpen}
          initialValues={task}
          onSubmitFunction={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default TaskCard;
