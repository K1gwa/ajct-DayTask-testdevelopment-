import React, { createContext, useContext, useState, useEffect } from "react"
import { auth, db } from "../firebaseConfig"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

const UsersContext = createContext()

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null)        // Firebase user object
  const [profile, setProfile] = useState(null)  // Firestore profile (username, photo)
  const [loading, setLoading] = useState(true)

  // 🔹 Watch Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        if (userDoc.exists()) {
          setProfile(userDoc.data())
        } else {
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // 🔹 Signup
  const signup = async (email, password, username) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    const newUser = userCred.user
    // create profile in Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      username,
      email,
      photoURL: null,
    })
    setProfile({ username, email, photoURL: null })
  }

  // 🔹 Login
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setProfile(null)
  }

  return (
    <UsersContext.Provider value={{ user, profile, signup, login, logout, loading, setProfile }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  return useContext(UsersContext)
}
