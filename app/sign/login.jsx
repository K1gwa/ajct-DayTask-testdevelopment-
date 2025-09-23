import React, { useState } from "react"
import { View, TextInput, Text, Pressable, StyleSheet, Alert } from "react-native"
import { useUsers } from "../../context/UsersContext"
import { router } from "expo-router"

export default function LoginScreen() {
  const { login } = useUsers()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password")
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      router.replace("home")
    } catch (err) {
      Alert.alert("Login Error", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back to</Text>
        <Text style={styles.subtitle1}>FyreTask!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <Pressable
          style={({ pressed, hovered }) => [
            styles.button,
            pressed && { backgroundColor: "#218838" },
            hovered && { backgroundColor: "#196028ff" },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </Pressable>
        <Pressable onPress={() => router.push("sign/signup")}>
          <Text style={styles.link}>Don’t have an account? <Text style={styles.linkBold}>Sign up</Text></Text>
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
    shadowOpacity: 0.345,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 16,
    color: "#d5daffff",
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
  button: {
    width: "100%",
    backgroundColor: "#28a745",
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