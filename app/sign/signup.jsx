import React, { useState } from "react"
import { View, TextInput, Text, Pressable, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { useUsers } from "../../context/UsersContext"
import { router } from "expo-router"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function SignupScreen() {
  const { signup } = useUsers()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill out all fields")
      return
    }

    try {
      setLoading(true)
      await signup(email, password, username)
      router.replace("/home")
    } catch (err) {
      Alert.alert("Signup Error", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle1}>You Are a Task Machine</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { marginBottom: 0, flex: 1, borderWidth: 0 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <Pressable
          style={({ pressed, hovered }) => [
            styles.button,
            pressed && { backgroundColor: "#0056b3" },
            hovered && { backgroundColor: "#004692ff" },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Creating..." : "Sign Up"}</Text>
        </Pressable>
        <Pressable onPress={() => router.push("sign/login")}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Log in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E1E68",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#5D2F77",
    borderRadius: 16,
    padding: 28,
    shadowColor: "#ffffffff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.312,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffd0f3ff",
    marginBottom: 24,
  },
  subtitle1: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#ff0000",
  marginBottom: 16,
  textShadowColor: "#0000ff",
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
  letterSpacing: 1,
  fontStyle: "italic",
},
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e1dd",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#22223b",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e1dd",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    marginBottom: 16,
    paddingRight: 10,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  link: {
    color: "#bbdcffff",
    marginTop: 10,
    fontSize: 15,
  },
  linkBold: {
    fontWeight: "bold",
    color: "#92aeffff",
  },
})