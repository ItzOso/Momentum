import React from "react";
import { FaRegCheckCircle, FaRegClock, FaTasks } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { useTasks } from "../../contexts/TasksProvider";
import { useProjects } from "../../contexts/ProjectsProvider";
import StatCard from "../common/StatCard";

function ProjectStatCards({ project }) {
  const { tasks } = useTasks();
  const tasksCount = project.tasksCount;
  const inProgress = tasks.filter(
    (task) => task.status === "in_progress"
  ).length;
  const completedTasks = project.tasksDoneCount;
  const progress =
    tasksCount > 0
      ? `${Math.round((completedTasks / tasksCount) * 100)}%`
      : "0%";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Tasks"
        stat={tasksCount}
        Icon={FaTasks}
        style="secondary"
      />
      <StatCard
        title="In Progress"
        stat={inProgress}
        color="blue"
        Icon={FaRegClock}
        style="secondary"
      />
      <StatCard
        title="Completed"
        stat={completedTasks}
        color="green"
        Icon={FaRegCheckCircle}
        style="secondary"
      />
      <StatCard
        title="Progress"
        stat={progress}
        color="purple"
        Icon={FaBoltLightning}
        style="secondary"
      />
    </div>
  );
}

export default ProjectStatCards;
