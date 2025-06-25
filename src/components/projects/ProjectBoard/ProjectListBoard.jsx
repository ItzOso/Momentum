import React from "react";
import { useTasks } from "../../../contexts/TasksProvider";
import TaskCard from "./TaskCard";

function ProjectListBoard({ project }) {
  const { tasks } = useTasks();
  return (
    <div className="space-y-4">
      {[...tasks].reverse().map((task) => (
        <TaskCard key={task.id} project={project} task={task} forList={true} />
      ))}
    </div>
  );
}

export default ProjectListBoard;
