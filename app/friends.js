import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const friendsData = [
  { id: '1', name: 'Bikram Sudi', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Tesang', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '5', name: 'Sourabh', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: '6', name: 'Rusha Yakha', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: '7', name: 'Khushi Vaishali', avatar: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { id: '8', name: 'Rahul Ranjan', avatar: 'https://randomuser.me/api/portraits/men/17.jpg' },
  { id: '9', name: 'Bishesh Adhikari', avatar: 'https://randomuser.me/api/portraits/men/21.jpg' },
  { id: '10', name: 'Khushioteshwor', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
];

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      {/* StatusBar Configuration */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
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
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FriendsScreen;
