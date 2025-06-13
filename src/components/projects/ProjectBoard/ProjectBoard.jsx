import React from "react";
import BoardColumn from "./BoardColumn";
import { FaHourglass, FaList } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

function ProjectBoard({ project, tasks }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <BoardColumn name="To Do" Icon={FaList} />
      <BoardColumn name="In Progress" Icon={FaHourglass} />
      <BoardColumn name="Done" Icon={FaRegCheckCircle} />
    </div>
  );
}

export default ProjectBoard;
