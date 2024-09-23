import React from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Layout() {
  const router = useRouter(); // Use router for navigation manually

  return (
    <>
      {/* Global StatusBar Setup */}
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
          },
          tabBarIconStyle: {
            size: 24,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="friends"
          options={{
            title: 'Friends',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="upload"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push('/upload'); // Manually navigate to the upload screen
                }}
                activeOpacity={0.7} // Change opacity when pressed
                style={styles.uploadIconContainer}
              >
                <FontAwesome name="plus" size={size} color={color} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
