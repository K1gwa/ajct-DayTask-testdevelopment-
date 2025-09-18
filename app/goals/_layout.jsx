import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import {GoalsProvider} from '../../context/Goalscontext'

export default function GoalsLayout() {

  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Your Tasks',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'home' : 'home-outline'}
                color="black"
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create a Task',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'create' : 'create-outline'}
                color="black"
              />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  )
}
