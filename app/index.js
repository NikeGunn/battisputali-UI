import React, { useRef, useState, useCallback } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; // Importing icons

const { height } = Dimensions.get('window'); // Get the screen height

const videoData = [
  { id: '1', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', url: 'https://www.w3schools.com/html/movie.mp4' },
];


const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [playingStatus, setPlayingStatus] = useState({});
  const videoRefs = useRef({});

  // Handle video press to toggle playback
  const togglePlayback = useCallback(async (index) => {
    const videoRef = videoRefs.current[index];
    if (videoRef) {
      const status = await videoRef.getStatusAsync();
      if (status.isPlaying) {
        videoRef.pauseAsync();
        setPlayingStatus((prevStatus) => ({ ...prevStatus, [index]: false }));
      } else {
        videoRef.playAsync();
        setPlayingStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
      }
    }
  }, []);

  // Handle viewable items change
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { index } = viewableItems[0];
      const videoId = videoData[index].id;
      setCurrentIndex(videoId);
      Object.keys(videoRefs.current).forEach((key) => {
        if (key !== videoId) {
          videoRefs.current[key]?.pauseAsync();
          setPlayingStatus((prevStatus) => ({ ...prevStatus, [key]: false }));
        }
      });
    }
  }, []);

  // Render each video item
  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Video
          ref={(ref) => (videoRefs.current[item.id] = ref)}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={currentIndex === item.id && playingStatus[item.id]}
          isLooping
          onPlaybackStatusUpdate={(status) => {
            if (status.isPlaying !== playingStatus[item.id]) {
              setPlayingStatus((prevStatus) => ({ ...prevStatus, [item.id]: status.isPlaying }));
            }
          }}
          onError={(error) => {
            console.error(`Error loading video ${item.id}:`, error);
            // Optionally, you can set an error state and show a fallback UI
          }}
        />
      {currentIndex === item.id && !playingStatus[item.id] && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => togglePlayback(item.id)}
            style={styles.controlButton}
          >
            <MaterialIcons
              name="play-arrow"
              size={60}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      {currentIndex === item.id && playingStatus[item.id] && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => togglePlayback(item.id)}
            style={styles.controlButton}
          >
            <MaterialIcons
              name="pause"
              size={60}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={videoData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default HomeScreen;
