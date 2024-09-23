import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
import { ExpoRoot } from 'expo-router';
import * as Font from 'expo-font'; // Import expo-font
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen to keep splash visible while loading fonts

// Keep the splash screen visible while fonts are being loaded
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isCheckingForUpdates, setIsCheckingForUpdates] = useState(true);
  const [isDownloadingUpdate, setIsDownloadingUpdate] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to track font loading

  // Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'), // Example for loading a custom font
          'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        });
        setFontsLoaded(true); // Set state to true when fonts are loaded
        await SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setIsUpdateAvailable(true);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      } finally {
        setIsCheckingForUpdates(false);
      }
    }
    checkForUpdates();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsDownloadingUpdate(true);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync(); // Reload the app to apply the update
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setIsDownloadingUpdate(false);
    }
  };

  if (!fontsLoaded) {
    // Render a loading screen while fonts are being loaded
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoRoot />

      {/* Modal for checking updates */}
      {isCheckingForUpdates && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* Modal when update is available */}
      <Modal
        visible={isUpdateAvailable}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUpdateAvailable(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.updateModal}>
            <Text style={styles.modalTitle}>New Update Available</Text>
            <Text style={styles.modalMessage}>
              A new version of the app is available. Update now to enjoy the latest features and improvements.
            </Text>
            {isDownloadingUpdate ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  updateModal: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
