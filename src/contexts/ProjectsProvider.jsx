import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const ProjectsContext = createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const userProjects = [];
        querySnapshot.forEach((doc) => {
          userProjects.push({ id: doc.id, ...doc.data() });
        });
        setProjects(userProjects);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects in real-time:", error);
        toast.error("Failed to load projects.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const value = {
    projects,
    loading,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
