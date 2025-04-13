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
  query,
  where,
  collectionGroup,
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
    return collection(db, "doodles");
  }

  async function getUser(id) {
    const snapshot = await getDoc(doc(db, "users", id));
    return snapshot.data();
  }

  async function getAllDoodles() {
    const snapshot = await getDocs(doodles());
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function getMyDoodles() {
    const userId = auth.user.uid;
    const doodlesQuery = query(doodles(), where("author", "==", userId));
    const snapshot = await getDocs(doodlesQuery);
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

  const value = {
    doodles,
    getUser,
    getAllDoodles,
    getMyDoodles,
    getDoodle,
    createDoodle,
    updateDoodle,
    deleteDoodle,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
