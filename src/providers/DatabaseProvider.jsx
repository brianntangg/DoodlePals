import { createContext, useContext } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthProvider.jsx";

const DatabaseContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useDb() {
  return useContext(DatabaseContext);
}

export default function DatabaseProvider({ children }) {
  const auth = useAuth();
  const db = getFirestore();

  function doodles() {
    return collection(db, "users", auth.user.uid, "doodles");
  }

  function comments(id) {
    return collection(doodles(), id, "comments");
  }

  async function getAllDoodles() {
    const snapshot = await getDocs(doodles());
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function getDoodle(id) {
    const snapshot = await getDoc(doc(doodles(), id));
    return snapshot.data();
  }

  async function createDoodle(doodle) {
    const docRef = await addDoc(doodles(), doodle);
    return docRef.id;
  }

  async function updateDoodle(id, doodle) {
    await updateDoc(doc(doodles(), id), doodle);
  }

  async function deleteDoodle(id) {
    await deleteDoc(doc(doodles(), id));
  }

  async function getAllComments(doodleId) {
    const snapshot = await getDocs(comments(doodleId));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function getComment(doodleId, id) {
    const snapshot = await getDoc(doc(comments(doodleId), id));
    return snapshot.data();
  }

  async function createComment(doodleId, comment) {
    const docRef = await addDoc(comments(doodleId), comment);
    return docRef.id;
  }

  async function updateComment(doodleId, id, comment) {
    await updateDoc(doc(comments(doodleId), id), comment);
  }

  async function deleteComment(doodleId, id) {
    await deleteDoc(doc(comments(doodleId), id));
  }

  const value = {
    doodles,
    getAllDoodles,
    getDoodle,
    createDoodle,
    updateDoodle,
    deleteDoodle,
    comments,
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
