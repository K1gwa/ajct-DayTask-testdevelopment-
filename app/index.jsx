import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { router } from "expo-router"

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle1}>FyreTask!</Text>
      <Text style={styles.subtitle}>Stay on track, one task at a time</Text>
      <Pressable style={styles.button} onPress={() => router.push("sign/login")}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.button1} onPress={() => router.push("sign/signup")}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent:"center", 
    alignItems: "center", 
    backgroundColor: "#3E1E68"  
},
  button: {
    backgroundColor: "#773a9bff",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginBottom:5,
},
  button1: {
    backgroundColor: "#856597ff",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginBottom:5,
},
  buttonText: { color: "#fff",
    fontSize: 16,
    fontWeight: "600"

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
    marginBottom: 10,
    textShadowColor: "#0000ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    fontStyle: "italic",
},
})
