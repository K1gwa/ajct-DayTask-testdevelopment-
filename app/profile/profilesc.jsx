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
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.inputLabel}> Edit Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Save Changes</Text>}
        </Pressable>
      </View>

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
    backgroundColor: "#2A1F3D",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff15",
  },
  backText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    color: "#fff",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff15",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    color: "#e0e0e0",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    backgroundColor: "#3b2b52",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#E94F37",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
