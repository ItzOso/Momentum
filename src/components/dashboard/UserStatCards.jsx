import React from "react";
import {
  FaChartLine,
  FaRegCheckCircle,
  FaRegClock,
  FaRegFolderOpen,
} from "react-icons/fa";
import StatCard from "../common/StatCard";

function UserStatCards({ projects }) {
  const totalTasks = projects.reduce(
    (total, project) => total + project.tasksCount,
    0
  );
  const completedTasks = projects.reduce(
    (total, project) => total + project.tasksDoneCount,
    0
  );
  const completionRate =
    totalTasks > 0
      ? `${Math.round((completedTasks / totalTasks) * 100)}%`
      : "0%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Projects"
        stat={projects.length}
        color="blue"
        Icon={FaRegFolderOpen}
      />
      <StatCard
        title="Total Tasks"
        stat={totalTasks}
        color="purple"
        Icon={FaRegClock}
      />
      <StatCard
        title="Completed"
        stat={completedTasks}
        color="green"
        Icon={FaRegCheckCircle}
      />
      <StatCard
        title="Completion Rate"
        stat={completionRate}
        color="orange"
        Icon={FaChartLine}
      />
    </div>
  );
}

export default UserStatCards;
