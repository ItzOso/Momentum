import React from "react";
import {
  FaChartLine,
  FaRegCheckCircle,
  FaRegClock,
  FaRegFolderOpen,
} from "react-icons/fa";
import StatCard from "./common/StatCard";

function UserStatCards({ projects }) {
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
        stat={projects.reduce(
          (total, project) => total + project.tasksCount,
          0
        )}
        color="purple"
        Icon={FaRegClock}
      />
      <StatCard
        title="Completed"
        stat={projects.reduce(
          (total, project) => total + project.tasksDoneCount,
          0
        )}
        color="green"
        Icon={FaRegCheckCircle}
      />
      <StatCard
        title="Completion Rate"
        stat="0%"
        color="orange"
        Icon={FaChartLine}
      />
    </div>
  );
}

export default UserStatCards;
