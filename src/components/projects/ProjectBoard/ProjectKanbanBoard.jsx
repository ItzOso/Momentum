import React from "react";
import BoardColumn from "./BoardColumn";
import { FaHourglass, FaList } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useTasks } from "../../../contexts/TasksProvider";

function ProjectKanbanBoard({ project }) {
  const { tasks, loading: isLoadingTasks } = useTasks();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <BoardColumn
        project={project}
        name="To Do"
        tasks={tasks.filter((task) => task.status === "todo")}
        Icon={FaList}
        color="gray"
      />
      <BoardColumn
        project={project}
        name="In Progress"
        tasks={tasks.filter((task) => task.status === "in_progress")}
        Icon={FaHourglass}
        color="blue"
      />
      <BoardColumn
        color="green"
        project={project}
        name="Done"
        tasks={tasks.filter((task) => task.status === "done")}
        Icon={FaRegCheckCircle}
      />
    </div>
  );
}

export default ProjectKanbanBoard;
