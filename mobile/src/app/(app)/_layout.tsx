import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerTitle: 'English Career AI',
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
          headerTitle: 'My Courses',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}
