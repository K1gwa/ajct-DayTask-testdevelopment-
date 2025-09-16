import { useState } from 'react'
import { StyleSheet, Text, TextInput, Pressable, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    // Replace this with your authentication logic
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.')
      return
    }
    // Example: successful login
    Alert.alert('Success', `Logged in as ${email}`)
    // Navigate to another screen if needed
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={{ color: 'white' }}>Login</Text>
      </Pressable>

      <Pressable style={styles.logintab} onPress={() => router.push('/goals/signup')}>
        <Text style={{ color: '#21cc8d' }}>Dont have an account? Signup</Text>
      </Pressable>

    </SafeAreaView>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: 300,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    padding: 16,
    backgroundColor: '#21cc8d',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width:300,

  },
   loginInTab: {
    marginTop: 20,
    alignItems: 'center',
  },
})