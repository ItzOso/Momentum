import React from "react";
import { FaEdit, FaInfo, FaInfoCircle, FaRegEdit } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TaskCard from "./TaskCard";
import DropdownShell from "../../common/DropdownShell";
import { FaEllipsis, FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import ActionMenu from "../../common/ActionMenu";
import { Droppable } from "@hello-pangea/dnd";
import { useTasks } from "../../../contexts/TasksProvider";

function BoardColumn({
  name,
  tasks,
  project,
  Icon = IoMdInformationCircleOutline,
  color = "gray",
  droppableId,
}) {
  const { tasks: allTasks } = useTasks();

  const columnStyles = {
    gray: {
      icon: "text-gray-500",
      count: "bg-gray-100 text-gray-700 border border-gray-200",
      dropzone: "bg-gray-50",
    },
    blue: {
      icon: "text-blue-500",
      count: "bg-blue-100 text-blue-700 border border-blue-200",
      dropzone: "bg-blue-50",
    },
    green: {
      icon: "text-green-500",
      count: "bg-green-100 text-green-700 border border-green-200",
      dropzone: "bg-green-50",
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

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] space-y-4 mt-4 rounded-lg transition-colors duration-200 ${
              snapshot.isDraggingOver ? style.dropzone : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                project={project}
                index={index}
                tasks={allTasks}
              />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center pt-20">
                <div
                  className={`shadow-sm mx-auto mb-2 rounded-full text-2xl w-12 h-12 flex items-center justify-center ${style.icon}`}
                >
                  <Icon />
                </div>
                <p className="text-gray-700">No tasks</p>
                <p className="text-sm text-gray-500 mt-1">
                  Drop a task here or add a new one
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default BoardColumn;
