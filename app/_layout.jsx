import { Stack } from "expo-router"
import { UsersProvider } from "../context/UsersContext"

export default function Layout() {
  return (
    <UsersProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign/signup" />
        <Stack.Screen name="sign/login" />
        <Stack.Screen name="home" />
      </Stack>
    </UsersProvider>
  )
}
