import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100, 
          paddingBottom: 20, 
          paddingTop: 10, 
        },
        tabBarItemStyle: {
          margin: 5,
          borderRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12, 
          marginTop: 4, 
          fontWeight: '500', 
        },
        tabBarActiveTintColor: '#6366f1', 
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tabs.Screen 
       name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Feather 
              name="home" 
              color={color} 
              size={focused ? 28 : 24}
              className={focused ? "text-indigo-500" : "text-slate-500"}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="list"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color, focused }) => (
            <Feather 
              name="list" 
              color={color} 
              size={focused ? 28 : 24}
              className={focused ? "text-indigo-500" : "text-slate-500"}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Feather 
              name="plus-circle" 
              color={color} 
              size={focused ? 28 : 24}
              className={focused ? "text-indigo-500" : "text-slate-500"}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Feather 
              name="user" 
              color={color} 
              size={focused ? 28 : 24}
              className={focused ? "text-indigo-500" : "text-slate-500"}
            />
          ),
        }}
      />
    </Tabs>
  );
}