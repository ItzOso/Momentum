import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "./firebaseConfig";
import { orderBy } from "firebase/firestore";

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

export const deleteProject = async (projectId, tasks) => {
  try {
    tasks.forEach(async (task) => {
      const taskRef = doc(db, "projects", projectId, "tasks", task.id);
      await deleteDoc(taskRef);
    });

    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (projectId, updates) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    console.log(updates);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
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
    const q = query(tasksRef, orderBy("updatedAt", "asc")); // oldest first, newest at the end
    const tasksSnapshots = await getDocs(q);
    const projectTasks = tasksSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
      tasksCount: increment(1),
      updatedAt: serverTimestamp(),
    });
    // const taskRef = doc(db, "projects", projectId, "tasks", taskRef.id); <-- this is how to get the ref

    return { id: taskRef.id, ...data };
  } catch (error) {
    throw error;
  }
};

export const updateProjectTask = async (projectId, taskId, updates) => {
  try {
    const taskRef = doc(db, "projects", projectId, "tasks", taskId);

    let prevTask = null;
    let wasDone = false;
    let isDone = false;
    let tasksDoneInc = 0;

    // Convert dueDate to Timestamp if present
    if (updates.dueDate) {
      const dateObject = new Date(updates.dueDate);
      if (!isNaN(dateObject.getTime())) {
        updates.dueDate = Timestamp.fromDate(dateObject);
      } else {
        throw new Error("Invalid due date format provided.");
      }
    }

    // Only fetch previous task if status is being updated
    if (updates.status) {
      const prevTaskSnap = await getDoc(taskRef);
      prevTask = prevTaskSnap.exists() ? prevTaskSnap.data() : null;
      if (prevTask) {
        wasDone = prevTask.status === "done";
        isDone = updates.status === "done";
        if (!wasDone && isDone) tasksDoneInc = 1;
        else if (wasDone && !isDone) tasksDoneInc = -1;
      }
    }

    await updateDoc(taskRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    const projectRef = doc(db, "projects", projectId);

    if (updates.status && prevTask && tasksDoneInc !== 0) {
      await updateDoc(projectRef, {
        tasksDoneCount: increment(tasksDoneInc),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(projectRef, {
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (projectId, taskId) => {
  try {
    const taskRef = doc(db, "projects", projectId, "tasks", taskId);
    await deleteDoc(taskRef);

    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      tasksCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};
