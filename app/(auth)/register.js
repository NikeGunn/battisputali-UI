import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useRouter, useNavigation } from "expo-router";

const RegisterScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [confirmSecureEntry, setConfirmSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => { 
      navigation.setOptions({
        headerShown: false,
      });
    }, []);


  const handleRegister = () => {
    // Dummy check to simulate registration
    if (password !== confirmPassword) {
      Alert.alert("Registration Failed", "Passwords do not match.");
      return;
    }
    if (email && password && confirmPassword) {
      router.push("(tabs)"); // Redirect to home screen after successful registration
    } else {
      Alert.alert("Registration Failed", "Please fill all fields.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={"#007AFF"} size={25} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Create</Text>
        <Text style={styles.headingText}>Your Account</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Email Field */}
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={"#888"} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={"#888"} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons
              name={secureEntry ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={"#888"} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor="#888"
            secureTextEntry={confirmSecureEntry}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmSecureEntry((prev) => !prev)}
          >
            <SimpleLineIcons
              name={confirmSecureEntry ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButtonWrapper} onPress={handleRegister}>
          <Text style={styles.registerText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: "#d4a5e8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: "#007AFF",
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
  },
  registerButtonWrapper: {
    backgroundColor: "tomato",
    borderRadius: 100,
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: "#007AFF",
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#d4a5e8",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: "#007AFF",
  },
  loginText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
