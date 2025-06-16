import React from "react";
import BoardColumn from "./BoardColumn";
import { FaHourglass, FaList } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

function ProjectBoard({ project, tasks }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <BoardColumn
        project={project}
        name="To Do"
        tasks={tasks.filter((task) => task.status === "todo")}
        Icon={FaList}
      />
      <BoardColumn
        project={project}
        name="In Progress"
        tasks={tasks.filter((task) => task.status === "in_progress")}
        Icon={FaHourglass}
      />
      <BoardColumn
        project={project}
        name="Done"
        tasks={tasks.filter((task) => task.status === "done")}
        Icon={FaRegCheckCircle}
      />
    </div>
  );
}

export default ProjectBoard;
