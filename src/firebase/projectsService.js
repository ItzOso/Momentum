import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
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
      taskStatuses: [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
      ],
      members: [uid],
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

export const createProjectTask = async (uid, projectId, taskInfo) => {
  try {
    const tasksRef = collection(db, "projects", projectId, "tasks");

    const { dueDate, ...otherTaskInfo } = taskInfo;

    const data = {
      uid,
      ...otherTaskInfo,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (dueDate) {
      const dateObject = new Date(dueDate);

      // Add validation to prevent saving an invalid date
      if (!isNaN(dateObject.getTime())) {
        data.dueDate = Timestamp.fromDate(dateObject);
      } else {
        throw new Error("Invalid due date format provided.");
      }
    }

    const taskRef = await addDoc(tasksRef, data);

    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      updatedAt: serverTimestamp(),
    });
    // const taskRef = doc(db, "projects", projectId, "tasks", taskRef.id); <-- this is how to get the ref

    return { id: taskRef.id, ...data };
  } catch (error) {
    throw error;
  }
};
