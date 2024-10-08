import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text, Share, StatusBar, Animated, Platform } from 'react-native';
import { Video } from 'expo-av';
import { Fontisto, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';



const { height } = Dimensions.get('window');

const videoData = [
  { id: '1', url: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 100, comments: [] },
  { id: '2', url: 'https://www.w3schools.com/html/movie.mp4', likes: 50, comments: [] },
];

const HomeScreen = () => {
 
  const [currentIndex, setCurrentIndex] = useState(null);
  const [playingStatus, setPlayingStatus] = useState({});
  const [likeStatus, setLikeStatus] = useState({});
  const videoRefs = useRef({});
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [comments, setComments] = useState('');
  const [videoComments, setVideoComments] = useState({});
  const modalTranslateY = useRef(new Animated.Value(height)).current;


  useEffect(() => {
    if (isCommentModalVisible) {
      Animated.timing(modalTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalTranslateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isCommentModalVisible]);

  const handleOpenComments = (index) => {
    setCurrentIndex(index);
    setCommentModalVisible(true);
  };

  const handleCloseComments = () => {
    setCommentModalVisible(false);
  };

  const handlePostComment = () => {
    if (currentIndex !== null) {
      setVideoComments((prev) => ({
        ...prev,
        [currentIndex]: [...(prev[currentIndex] || []), comments],
      }));
      setComments('');
      handleCloseComments();
    }
  };

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

  const toggleLike = (index) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [index]: !prevStatus[index],
    }));
  };

  const handleShare = async (url) => {
    try {
      await Share.share({
        message: `Check out this cool video: ${url}`,
      });
    } catch (error) {
      console.error("Error sharing video:", error);
    }
  };

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
        }}
      />
      {currentIndex === item.id && !playingStatus[item.id] && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => togglePlayback(item.id)} style={styles.controlButton}>
            <MaterialIcons name="play-arrow" size={60} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {currentIndex === item.id && playingStatus[item.id] && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => togglePlayback(item.id)} style={styles.controlButton}>
            <MaterialIcons name="pause" size={60} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionButton}>
          <AntDesign
            name={likeStatus[item.id] ? 'heart' : 'hearto'}
            size={30}
            color={likeStatus[item.id] ? 'red' : 'white'}
          />
          <Text style={styles.actionText}>{likeStatus[item.id] ? item.likes + 1 : item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenComments(item.id)} style={styles.actionButton}>
          <FontAwesome name="comment-o" size={30} color="white" />
          <Text style={styles.actionText}>{item.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(item.url)} style={styles.actionButton}>
          <Fontisto name="share-a" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Force StatusBar to show on HomeScreen */}
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
      {/* Add Text at the top */}
      <Text style={styles.topText}>For You</Text>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topText: {
    position: 'absolute',
    top: 40,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
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
  actionContainer: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
  },
});

export default HomeScreen;
