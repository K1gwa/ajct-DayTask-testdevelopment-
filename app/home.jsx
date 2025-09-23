import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, TextInput, Alert, FlatList } from "react-native"
import { useUsers } from "../context/UsersContext"
import { router } from "expo-router"
import { db } from "../firebaseConfig"
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"

export default function HomeScreen() {
  const { profile, user, logout } = useUsers()
  const [task, setTask] = useState("")
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [editTaskId, setEditTaskId] = useState(null)

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTasks(userTasks)
    })

    return () => unsubscribe()
  }, [user])

  const handleAddTask = async () => {
    if (!task.trim()) {
      Alert.alert("Error", "Task cannot be empty")
      return
    }

    try {
      setLoading(true)
      if (editTaskId) {
        const taskRef = doc(db, "users", user.uid, "tasks", editTaskId)
        await updateDoc(taskRef, { text: task })
        setEditTaskId(null)
      } else {
        await addDoc(collection(db, "users", user.uid, "tasks"), {
          text: task,
          createdAt: serverTimestamp(),
          completed: false,
        })
      }
      setTask("")
    } catch (err) {
      Alert.alert("Error", err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditTask = (item) => {
    setTask(item.text)
    setEditTaskId(item.id)
  }

  const handleDeleteTask = async (id) => {
    try {
      const taskRef = doc(db, "users", user.uid, "tasks", id)
      await deleteDoc(taskRef)
      Alert.alert("Well done", "Task has been deleted!")
    } catch (err) {
      Alert.alert("Error", err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {profile?.username || "User"}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && { backgroundColor: "#9e4897ff", shadowRadius: 1, },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleAddTask}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>
            {loading ? "Saving..." : editTaskId ? "Update" : "Add"}
          </Text>
        </Pressable>
      </View>
<Text style={styles.subtt}>Your Tasks</Text>

      <View style={[styles.card, { flex: 1 }]}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.text}</Text>
              <View style={styles.actions}>
                <Pressable
                  style={({ pressed }) => [
                    styles.editButton,
                    pressed && { backgroundColor: "#e0a800" }
                  ]}
                  onPress={() => handleEditTask(item)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && { backgroundColor: "#b52a37" }
                  ]}
                  onPress={() => handleDeleteTask(item.id)}
                >
                  <Text style={styles.actionText}>Done</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet.</Text>}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: "100%" }}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.profileButton,
          pressed && { backgroundColor: "#218838" }
        ]}
        onPress={() => router.push("/profile/profilesc")}
      >
        <Text style={styles.profileText}>Go to Profile</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D2F77",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFACAC",
    marginBottom: 18,
    marginTop: 24,
    width:"100%",
    textAlignt:"left"
  },
    inputRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 18,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E45A92",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#ffecec",
    color: "#22223b",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#E45A92",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 48,        
    minWidth: 80,      
    elevation: 3,
    shadowColor: "#004370ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },


  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffececff",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    backgroundColor: "#fff6fa",
    borderRadius: 10,
    shadowColor: "#7a0063ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: "#22223b",
    flex: 1,
    marginRight: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#ffc107",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginRight: 4,
    elevation: 1,
  },
  deleteButton: {
    backgroundColor: "#2bc600ff",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 5,
    elevation: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
  profileButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    elevation: 2,
  },
  profileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  subtt:{
  fontSize: 24,
  fontWeight: "bold",
  color: "#ff0000",
  textShadowColor: "#0000ff",
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
  letterSpacing: 1,
  fontStyle: "italic",
  width:"100%",
  textAlignt:"left"

  }
})