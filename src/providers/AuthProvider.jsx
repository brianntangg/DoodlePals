import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  async function logIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, password, username) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
    console.log(username);
    await setDoc(doc(db, "users", user.user.uid), { username });
    return user;
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    logIn,
    signUp,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
