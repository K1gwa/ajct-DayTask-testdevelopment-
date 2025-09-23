import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from "react-native"
import { useUsers } from "../../context/UsersContext"
import { db } from "../../firebaseConfig"
import { doc, updateDoc } from "firebase/firestore"
import { router } from "expo-router"

export default function ProfileScreen() {
  const { user, profile, setProfile, logout } = useUsers()
  const [username, setUsername] = useState(profile?.username || "")
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    if (!user) return
    try {
      setSaving(true)
      await updateDoc(doc(db, "users", user.uid), {
        username: username || profile?.username,
      })
      setProfile({ ...profile, username })
      Alert.alert("Success", "Profile updated!")
    } catch (err) {
      Alert.alert("Error", err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.replace("../sign/login")
    } catch (err) {
      Alert.alert("Error", err.message)
    }
  }

  const handleBack = () => {
    router.replace("/home")
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Profile</Text>
 <Text style={styles.inputLabel}>Edit Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />

      <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Save Changes</Text>}
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#3E1E68"
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    elevation: 2,
  },

  backText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:"#ffffffff",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    backgroundColor:"#f0f0f0",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  saveText: { color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#d0feffff",
    marginTop: 10,
    marginBottom: 0,
    fontWeight: "500",
},
})