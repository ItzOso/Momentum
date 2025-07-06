import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";

const TasksContext = createContext();

export const useTasks = () => {
  return useContext(TasksContext);
};

export const TasksProvider = ({ children, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optimisticUpdates, setOptimisticUpdates] = useState(new Map());

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy("updatedAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const projectTasks = [];
        querySnapshot.forEach((doc) => {
          projectTasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(projectTasks);
        setOptimisticUpdates(new Map()); // Clear optimistic updates when we get real data
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks in real-time:", error);
        toast.error("Failed to load tasks.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId, currentUser]);

  // Apply optimistic updates to tasks
  const getOptimisticTasks = () => {
    if (optimisticUpdates.size === 0) return tasks;

    return tasks.map((task) => {
      const update = optimisticUpdates.get(task.id);
      return update ? { ...task, ...update } : task;
    });
  };

  const updateTaskOptimistically = (taskId, updates) => {
    setOptimisticUpdates((prev) => {
      const newUpdates = new Map(prev);
      newUpdates.set(taskId, updates);
      return newUpdates;
    });
  };

  const clearOptimisticUpdate = (taskId) => {
    setOptimisticUpdates((prev) => {
      const newUpdates = new Map(prev);
      newUpdates.delete(taskId);
      return newUpdates;
    });
  };

  const value = {
    tasks: getOptimisticTasks(),
    loading,
    updateTaskOptimistically,
    clearOptimisticUpdate,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
