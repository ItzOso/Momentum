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

  const value = {
    tasks,
    loading,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
