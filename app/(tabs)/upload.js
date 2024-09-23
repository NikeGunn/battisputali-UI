import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';  // Axios for HTTP requests
import * as FileSystem from 'expo-file-system'; // FileSystem to read the video file

const UploadScreen = () => {
  const [videoUri, setVideoUri] = useState('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [uploading, setUploading] = useState(false);

  // Request permission to access media library
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);

 // Pick video from gallery
const pickVideo = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    console.log('Video picker result:', result); // Log result for debugging

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri); // Update this line
    } else {
      Alert.alert('No video selected');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to pick video: ' + error.message);
  }
};

// Function to upload video to backend
const handleUpload = async () => {
  if (!videoUri || !title || !hashtags) {
    Alert.alert('Error', 'Please fill all fields and select a video!');
    return;
  }

  try {
    setUploading(true);

    // Read the video file from the local file system
    const fileInfo = await FileSystem.getInfoAsync(videoUri);
    const fileName = fileInfo.uri.split('/').pop();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('hashtags', hashtags);
    formData.append('video', {
      uri: videoUri,
      type: 'video/mp4',  // Make sure this matches the actual video type
      name: fileName,
    });

    // Send POST request to backend
    const response = await axios.post('http://localhost:5000/api/videos/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      Alert.alert('Success', 'Video uploaded successfully!');
      setVideoUri('');
      setTitle('');
      setHashtags('');
    } else {
      Alert.alert('Error', 'Failed to upload video');
    }
  } catch (error) {
    console.error('Upload error:', error); // Log error for debugging
    Alert.alert('Error', 'An error occurred during upload: ' + error.message);
  } finally {
    setUploading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titlePutali}>३२ पुतली</Text>
      <Text style={styles.title}>Upload Your Video</Text>
      <Button
        title="Pick a Video"
        onPress={pickVideo}
        icon={<Icon name="video-library" type="material" color="white" />}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
      {videoUri ? (
        <Image source={{ uri: videoUri }} style={styles.videoThumbnail} />
      ) : (
        <Text style={styles.placeholderText}>No video selected</Text>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="title" type="material" color="gray" />}
      />
      <Input
        placeholder="Hashtags"
        value={hashtags}
        onChangeText={setHashtags}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={<Icon name="tag" type="material" color="gray" />}
      />
      <Button
        title={uploading ? 'Uploading...' : 'Upload'}
        onPress={handleUpload}
        disabled={uploading}
        icon={<Icon name="upload" type="material" color="white" />}
        buttonStyle={styles.uploadButton}
        containerStyle={styles.uploadButtonContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  titlePutali: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "#d4a5e8",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "tomato",
  },
  button: {
    backgroundColor: '#ff5722',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
  },
  uploadButton: {
    backgroundColor: '#2196f3',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
  },
  uploadButtonContainer: {
    marginTop: 20,
  },
});

export default UploadScreen;
