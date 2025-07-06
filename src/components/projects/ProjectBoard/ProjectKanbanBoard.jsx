import React from "react";
import BoardColumn from "./BoardColumn";
import { FaHourglass, FaList } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useTasks } from "../../../contexts/TasksProvider";
import { DragDropContext } from "@hello-pangea/dnd";
import { updateProjectTask } from "../../../firebase/projectsService";
import toast from "react-hot-toast";

function ProjectKanbanBoard({ project }) {
  const { tasks, updateTaskOptimistically, clearOptimisticUpdate } = useTasks();

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area or in the same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    try {
      const task = tasks.find((t) => t.id === draggableId);
      if (!task) return;

      // Get tasks in source and destination columns
      const sourceList = tasks
        .filter((t) => t.status === source.droppableId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const destinationList =
        destination.droppableId === source.droppableId
          ? sourceList.filter((t) => t.id !== task.id) // Remove the task from the list for same column moves
          : tasks
              .filter((t) => t.status === destination.droppableId)
              .sort((a, b) => (a.order || 0) - (b.order || 0));

      // Calculate new order value
      let newOrder;

      if (destination.droppableId === source.droppableId) {
        // Same column reorder
        if (destination.index === 0) {
          // Moving to start
          const firstTask = destinationList[0];
          newOrder = firstTask ? firstTask.order - 1000 : 0;
        } else if (destination.index >= destinationList.length) {
          // Moving to end
          const lastTask = destinationList[destinationList.length - 1];
          newOrder = (lastTask?.order || 0) + 1000;
        } else {
          // Moving between two tasks
          const beforeTask = destinationList[destination.index - 1];
          const afterTask = destinationList[destination.index];
          newOrder =
            beforeTask && afterTask
              ? beforeTask.order + (afterTask.order - beforeTask.order) / 2
              : destination.index * 1000;
        }
      } else {
        // Moving to different column
        if (destination.index === 0) {
          // Moving to start of new column
          const firstTask = destinationList[0];
          newOrder = firstTask ? firstTask.order - 1000 : 0;
        } else if (destination.index >= destinationList.length) {
          // Moving to end of new column
          const lastTask = destinationList[destinationList.length - 1];
          newOrder = (lastTask?.order || 0) + 1000;
        } else {
          // Moving between two tasks
          const beforeTask = destinationList[destination.index - 1];
          const afterTask = destinationList[destination.index];
          newOrder =
            beforeTask && afterTask
              ? beforeTask.order + (afterTask.order - beforeTask.order) / 2
              : destination.index * 1000;
        }
      }

      // Apply optimistic update
      const updates = {
        ...(destination.droppableId !== source.droppableId && {
          status: destination.droppableId,
        }),
        order: newOrder,
        updatedAt: new Date(),
      };

      updateTaskOptimistically(task.id, updates);

      // Update in Firebase
      await updateProjectTask(project.id, task.id, updates);

      // Clear optimistic update after successful Firebase update
      clearOptimisticUpdate(task.id);
      toast.success("Task moved successfully");
    } catch (error) {
      console.error("Error moving task:", error);
      // Clear optimistic update on error
      clearOptimisticUpdate(task.id);
      toast.error("Failed to move task");
    }
  };

  // Group and sort tasks by status and order
  const tasksByStatus = {
    todo: tasks
      .filter((task) => task.status === "todo")
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    in_progress: tasks
      .filter((task) => task.status === "in_progress")
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    done: tasks
      .filter((task) => task.status === "done")
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BoardColumn
          project={project}
          name="To Do"
          tasks={tasksByStatus.todo}
          Icon={FaList}
          color="gray"
          droppableId="todo"
        />
        <BoardColumn
          project={project}
          name="In Progress"
          tasks={tasksByStatus.in_progress}
          Icon={FaHourglass}
          color="blue"
          droppableId="in_progress"
        />
        <BoardColumn
          color="green"
          project={project}
          name="Done"
          tasks={tasksByStatus.done}
          Icon={FaRegCheckCircle}
          droppableId="done"
        />
      </div>
    </DragDropContext>
  );
}

export default ProjectKanbanBoard;
