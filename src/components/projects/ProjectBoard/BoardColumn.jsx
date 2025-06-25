import React from "react";
import { FaEdit, FaInfo, FaInfoCircle, FaRegEdit } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TaskCard from "./TaskCard";
import DropdownShell from "../../common/DropdownShell";
import { FaEllipsis, FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import ActionMenu from "../../common/ActionMenu";

function BoardColumn({
  name,
  tasks,
  project,
  Icon = IoMdInformationCircleOutline,
  color = "gray",
}) {
  const columnStyles = {
    gray: {
      icon: "text-gray-500",
      count: "bg-gray-100 text-gray-700 border border-gray-200",
    },
    blue: {
      icon: "text-blue-500",
      count: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    green: {
      icon: "text-green-500",
      count: "bg-green-100 text-green-700 border border-green-200",
    },
  };

  const style = columnStyles[color] || columnStyles.gray;
  return (
    <div className="card hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg flex gap-4 items-center">
          <div
            className={`shadow-sm rounded-xl w-8 h-8 flex items-center justify-center ${style.icon}`}
          >
            <Icon />
          </div>
          <p>{name}</p>
        </div>
        <p
          className={`py-1 px-3 ${style.count} rounded-2xl text-xs font-medium`}
        >
          {tasks.length}
        </p>
      </div>

      <div className="min-h-[400px] space-y-4 mt-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} project={project} />
        ))}

        {/* <div className="text-center">
          <div className="shadow-sm mx-auto mb-2 mt-20 rounded-full text-2xl w-12 h-12 flex items-center justify-center text-blue-500">
            <Icon />
          </div>
          <p>No tasks in in progress</p>
          <p className="text-sm text-gray-500 mt-1">
            Tasks will appear here when added
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default BoardColumn;
