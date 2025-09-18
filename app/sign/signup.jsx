import React, { useContext, useState } from "react"
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native"
import { UsersContext } from "../context1/UsersContext"


export default function SignupScreen() {
  const { signupUser } = useContext(UsersContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      await signupUser(email, password, { name: "New User" })
      alert("User created successfully!")
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <Pressable 
        style={({ pressed }) => [
          styles.button, 
          { backgroundColor: pressed ? "#45a049" : "#4CAF50" }
        ]} 
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  button: { padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" }
})
