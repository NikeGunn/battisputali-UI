import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';

const notificationsData = [
  { id: '1', message: 'John Doe liked your video', time: '2 hours ago' },
  { id: '2', message: 'Jane Smith started following you', time: '1 day ago' },
  { id: '3', message: 'Alex Johnson commented on your video', time: '3 days ago' },
  { id: '4', message: 'Someone shared your video', time: '6 days ago' },
  { id: '5', message: 'Ruhsa Yakkha shared your video', time: '7 days ago' },
  { id: '6', message: 'Koteshwor shared your video', time: '8 days ago' },
  { id: '7', message: 'Bikram shared your video', time: '9 days ago' },
  { id: '8', message: 'SUdi shared your video', time: '13 days ago' },
  { id: '9', message: 'Raman.S shared your video', time: '16 days ago' },
  { id: '10', message: 'Nikhil shared your video', time: '20 days ago' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {/* StatusBar Configuration */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,  // Add padding to avoid content overlap with StatusBar
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default NotificationScreen;
