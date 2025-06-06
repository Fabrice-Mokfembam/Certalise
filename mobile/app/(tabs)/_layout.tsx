import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 100, paddingBottom: 20, paddingTop: 10 },
        tabBarItemStyle: { margin: 5, borderRadius: 10 },
        tabBarLabelStyle: { fontSize: 12, marginTop: 4, fontWeight: '500' },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'scan',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="camera" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
         <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="plus-circle" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
        <Tabs.Screen
        name="list"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="search" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="audit"
        options={{
          title: 'Audit',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="check-square" color={color} size={focused ? 28 : 24} />
          ),
        }}
      />
    </Tabs>
  );
}