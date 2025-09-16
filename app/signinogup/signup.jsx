import { useState } from 'react'
import { StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.')
      return
    }
    Alert.alert('Success', `Account created for ${email}`)
    // Add your sign-up logic here
    // Optionally navigate to login or home
    router.push('/goals/login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </Pressable>

      <Pressable style={styles.signInTab} onPress={() => router.push('/goals/login')}>
        <Text style={{ color: '#21cc8d' }}>Already have an account? Login</Text>
      </Pressable>
      
    </SafeAreaView>
  )
}

export default Signup

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
    width: 300,
  },
  signInTab: {
    marginTop: 20,
    alignItems: 'center',
  },
  })