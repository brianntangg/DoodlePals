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
    return collection(db, "users", auth.user.uid, "doodles");
  }

  async function getUser(id) {
    const snapshot = await getDoc(doc(db, "users", id));
    return snapshot.data();
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

  async function getAllCommunityDoodles() {
      const q = query(
          collectionGroup(db, "doodles")
      );

      const snapshot = await getDocs(q);

      const doodles = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          likes: data.likes || [],
          comments: data.comments || {}
        };
      });

      return doodles;
  }

  const value = {
    doodles,
    getUser,
    getAllDoodles,
    getDoodle,
    createDoodle,
    updateDoodle,
    deleteDoodle,
    getAllCommunityDoodles,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
