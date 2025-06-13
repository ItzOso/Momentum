import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "./firebaseConfig";

export const createProject = async (uid, projectInfo) => {
  try {
    if (!projectInfo.title) return;
    const projectsRef = collection(db, "projects");
    const data = {
      uid,
      title: projectInfo.title,
      description: projectInfo.description,
      taskStatuses: ["todo", "in_progress", "done"],
      tasksCount: 0,
      tasksDoneCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const projectRef = await addDoc(projectsRef, data);

    // const tasksRef = collection(db, "projects", projectRef.id, "tasks"); <-- this is how to get subcollection collection ref

    return { id: projectRef.id, ...data };
  } catch (error) {
    throw error;
  }
};

export const getUserProjects = async (uid) => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("uid", "==", uid));
    const projectsSnapshots = await getDocs(q);
    const userProjects = projectsSnapshots.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return userProjects;
  } catch (error) {
    throw error;
  }
};
