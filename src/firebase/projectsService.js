import {
  addDoc,
  collection,
  doc,
  getDoc,
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
      taskStatuses: ["todo", "inprogress", "done"],
      tasksCount: 0,
      tasksDoneCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const projectRef = await addDoc(projectsRef, data);

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

export const getProject = async (id) => {
  try {
    const projectRef = doc(db, "projects", id);
    const projectSnapshot = await getDoc(projectRef);
    if (projectSnapshot.exists())
      return { id: projectSnapshot.id, ...projectSnapshot.data() };
    return null;
  } catch (error) {
    throw error;
  }
};

export const getProjectTasks = async (projectId) => {
  try {
    const tasksRef = collection(db, "projects", projectId, "tasks");
    const tasksSnapshots = await getDocs(tasksRef);
    const projectTasks = tasksSnapshots.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return projectTasks;
  } catch (error) {
    throw error;
  }
};
