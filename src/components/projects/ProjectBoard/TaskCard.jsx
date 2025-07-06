import React, { useState } from "react";
import DropdownShell from "../../common/DropdownShell";
import {
  FaEllipsis,
  FaRegClock,
  FaRegTrashCan,
  FaRegComment,
  FaCheck,
} from "react-icons/fa6";
import ActionMenu from "../../common/ActionMenu";
import { FaRegCheckSquare, FaRegEdit, FaPlus } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import DropdownInput from "../../common/DropdownInput";
import toast from "react-hot-toast";
import {
  deleteTask,
  updateProjectTask,
} from "../../../firebase/projectsService";
import ConfirmActionModal from "../../common/ConfirmActionModal";
import TaskForm from "../tasks/TaskForm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../../contexts/AuthProvider";

const PRIORITY_STYLES = {
  high: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
  medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  low: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};

function TaskCard({ task, project, forList = false }) {
  const { currentUser } = useAuth();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [newComment, setNewComment] = useState("");
  const {
    title,
    description,
    status,
    dueDate,
    priority = "medium",
    comments = [],
    checklist = [],
  } = task;
  const [currentStatus, setCurrentStatus] = useState(status);

  const priorityStyle = PRIORITY_STYLES[priority] || PRIORITY_STYLES.medium;

  const formatDate = (date) => {
    if (!date) return "";
    const d = date.toDate();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  };

  const getDueDateStatus = () => {
    if (!dueDate) return null;

    const now = new Date();
    const due = dueDate.toDate();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return {
        label: "Overdue",
        style: "bg-red-100 text-red-700 border-red-200",
      };
    if (diffDays === 0)
      return {
        label: "Due Today",
        style: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    if (diffDays <= 2)
      return {
        label: "Due Soon",
        style: "bg-orange-100 text-orange-700 border-orange-200",
      };
    return null;
  };

  const dueDateStatus = getDueDateStatus();
  const completedItems = checklist.filter((item) => item.completed).length;
  const totalItems = checklist.length;
  const checklistProgress =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const toggleChecklistItem = async (index) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );

    try {
      await updateProjectTask(project.id, task.id, {
        checklist: updatedChecklist,
      });
      toast.success("Checklist updated");
    } catch (error) {
      toast.error("Failed to update checklist");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      text: newComment.trim(),
      createdAt: new Date(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
    };

    try {
      await updateProjectTask(project.id, task.id, {
        comments: [...comments, comment],
      });
      setNewComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleStatusChange = async (selectedOption) => {
    try {
      setCurrentStatus(selectedOption.value);
      if (currentStatus != selectedOption.value) {
        await updateProjectTask(project.id, task.id, {
          status: selectedOption.value,
        });
        toast.success("Successfully moved task");
      }
    } catch (error) {
      toast.error("Failed to move task. Please try again.");
    }
  };
  const actionButtons = [
    {
      ButtonIcon: FaRegEdit,
      buttonText: "Edit Task",
      isDestructable: false,
      onClick: () => {
        setIsEditTaskOpen(true);
      },
    },
    {
      ButtonIcon: FaRegTrashCan,
      buttonText: "DeleteTask",
      isDestructable: true,
      onClick: () => {
        setIsConfirmDeleteOpen(true);
      },
    },
  ];

  const handleUpdateTask = async (updates) => {
    try {
      await updateProjectTask(project.id, task.id, updates);
      toast.success("Successfully updated task");
    } catch (error) {
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(project.id, task.id);
      toast.success("Successfully deleted task");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const styleOptions = {
    gray: {
      border: "border-l-gray-500",
      count: "bg-gray-100 text-gray-700 border border-gray-200",
    },
    blue: {
      border: "border-l-blue-500",
      count: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    green: {
      border: "border-l-green-500",
      count: "bg-green-100 text-green-700 border border-green-200",
    },
  };

  const style =
    task.status === "todo"
      ? styleOptions.gray
      : task.status === "in_progress"
      ? styleOptions.blue
      : styleOptions.green;
  // Find the status object from project.statuses that matches the task's status value
  const statusObj = project?.taskStatuses?.find((s) => s.value === task.status);

  return (
    <div
      className={`card ${
        forList ? `border-l-4 ${style.border}` : "p-4"
      } hover:shadow-md transition-all`}
    >
      <div className="flex flex-col gap-3">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`font-semibold ${forList ? "text-lg" : "text-sm"}`}>
                {title}
              </p>
              <div className="flex gap-2 items-center flex-wrap">
                {forList && (
                  <p
                    className={`py-1 px-3 ${style.count} rounded-2xl text-xs font-medium`}
                  >
                    {statusObj?.label || currentStatus}
                  </p>
                )}
                <p
                  className={`py-1 px-3 ${priorityStyle.bg} ${priorityStyle.text} border ${priorityStyle.border} rounded-2xl text-xs font-medium`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </p>
              </div>
            </div>

            {/* Description Section */}
            {description && (
              <div className="prose prose-sm max-w-none text-xs line-clamp-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {description}
                </ReactMarkdown>
              </div>
            )}

            {/* Metadata Section */}
            <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600">
              {dueDate && (
                <div className="flex items-center gap-1">
                  <IoTimeOutline className="text-gray-400" />
                  <span>{formatDate(dueDate)}</span>
                  {dueDateStatus && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${dueDateStatus.style}`}
                    >
                      {dueDateStatus.label}
                    </span>
                  )}
                </div>
              )}

              {checklist.length > 0 && (
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="flex items-center gap-1 hover:text-gray-800"
                >
                  <FaRegCheckSquare className="text-gray-400" />
                  <span>{`${completedItems}/${totalItems}`}</span>
                </button>
              )}

              {comments.length > 0 && (
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-1 hover:text-gray-800"
                >
                  <FaRegComment className="text-gray-400" />
                  <span>{comments.length}</span>
                </button>
              )}
            </div>
          </div>

          <DropdownShell
            trigger={
              <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
                <FaEllipsis />
              </button>
            }
          >
            <div className="space-y-1">
              <DropdownInput
                options={project?.taskStatuses}
                value={currentStatus}
                onChange={handleStatusChange}
                placeholder="Select a status..."
              />
              <ActionMenu actions={actionButtons} />
            </div>
          </DropdownShell>
        </div>

        {/* Checklist Section */}
        {showChecklist && checklist.length > 0 && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">Checklist</h4>
              <div className="text-xs text-gray-600">{`${checklistProgress}% complete`}</div>
            </div>
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(index)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span
                    className={`flex-1 text-sm ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() => toggleChecklistItem(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                  >
                    <FaCheck size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="mt-2 space-y-3">
            <h4 className="font-medium text-sm">Comments</h4>
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-2 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{comment.userEmail}</p>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              ))}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 input text-sm py-1.5"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {isConfirmDeleteOpen && (
        <ConfirmActionModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          onConfirm={handleDeleteTask}
          setIsOpen={setIsConfirmDeleteOpen}
        />
      )}

      {isEditTaskOpen && (
        <TaskForm
          project={project}
          title="Edit Task"
          subtitle="Update task details"
          Icon={FaRegEdit}
          buttonText="Save Changes"
          setView={setIsEditTaskOpen}
          onSubmitFunction={handleUpdateTask}
          initialValues={task}
        />
      )}
    </div>
  );
}

export default TaskCard;
