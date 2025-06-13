import React from "react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TaskCard from "./TaskCard";

function BoardColumn({ name, Icon = IoMdInformationCircleOutline }) {
  return (
    <div className="card hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg flex gap-4 items-center">
          <div className="shadow-sm rounded-xl w-8 h-8 flex items-center justify-center text-blue-500">
            <Icon />
          </div>
          <p>{name}</p>
        </div>
        <p className="py-1 px-3 bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-medium">
          0
        </p>
      </div>

      <div className="min-h-[400px] space-y-4 mt-4">
        <div className="text-center">
          <div className="shadow-sm mx-auto mb-2 mt-20 rounded-full text-2xl w-12 h-12 flex items-center justify-center text-blue-500">
            <Icon />
          </div>
          <p>No tasks in in progress</p>
          <p className="text-sm text-gray-500 mt-1">
            Tasks will appear here when added
          </p>
        </div>
      </div>
    </div>
  );
}

export default BoardColumn;
