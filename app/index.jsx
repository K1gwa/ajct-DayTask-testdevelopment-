import { Link } from 'expo-router'
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        M Y  T A S K S
      </Text>
      <Link style={styles.link} href="/goals">
        View Your Tasks
      </Link>
      <Link style={styles.link} href="/goals/create">
        Add a New Task
      </Link>
      <Link style={styles.link} href="/sign/login">
        Login
      </Link>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#59166dff',
  },
  title: {
    marginVertical: 40,
    fontSize: 28,
  },
  link: {
    marginVertical: 20,
    padding: 16,
    width: 150,
    textAlign: 'center',
    backgroundColor: '#216bccff',
    color: 'white',
    borderRadius: 8,
  },




})

 export default Home