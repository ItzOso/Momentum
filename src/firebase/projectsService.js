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

export const createProject = async (uid, title, description) => {
  try {
    if (!title) return;
    const projectsRef = collection(db, "projects");
    const data = {
      uid,
      title,
      description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const projectRef = await addDoc(projectsRef, data);
    return { id: projectRef.id, data };
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
