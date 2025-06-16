import React, { useState } from "react";
import DropdownShell from "../../common/DropdownShell";
import { FaEllipsis, FaRegClock, FaRegTrashCan } from "react-icons/fa6";
import ActionMenu from "../../common/ActionMenu";
import { FaRegEdit } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import DropdownInput from "../../common/DropdownInput";
import toast from "react-hot-toast";
import { updateProjectTask } from "../../../firebase/projectsService";

function TaskCard({ task, project }) {
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
      onClick: () => {},
    },
    {
      ButtonIcon: FaRegTrashCan,
      buttonText: "DeleteTask",
      isDestructable: true,
      onClick: () => {},
    },
  ];
  return (
    <div className="card p-4 hover:shadow-md transition-all ">
      <div className="flex justify-between items-start">
        <p className="font-semibold text-sm">{title}</p>
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
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      {dueDate && (
        <p className="flex items-center gap-1 text-xs text-gray-600 mt-2">
          <FaRegClock />
          {dueDate.toDate().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}

export default TaskCard;
