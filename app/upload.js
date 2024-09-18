import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const UploadScreen = () => {
  const [videoUri, setVideoUri] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [hashtags, setHashtags] = React.useState('');

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.uri);
    }
  };

  const handleUpload = () => {
    // Implement your video upload logic here
    console.log('Title:', title);
    console.log('Hashtags:', hashtags);
    console.log('Video URI:', videoUri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        title="Upload"
        onPress={handleUpload}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
