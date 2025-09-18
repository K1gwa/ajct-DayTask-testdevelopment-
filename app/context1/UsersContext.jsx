import { createContext, useState } from "react"
import { auth, db } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const UsersContext = createContext()

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null)

  // ✅ Create user with Firebase Auth + Firestore
  async function signupUser(email, password, additionalData = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user
      setUser(newUser)

      // Store extra user info in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        ...additionalData,
        createdAt: new Date()
      })
    } catch (error) {
      console.error("Signup error:", error.message)
      throw error
    }
  }

  return (
    <UsersContext.Provider value={{ user, signupUser }}>
      {children}
    </UsersContext.Provider>
  )
}
