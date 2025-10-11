import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "@react-native-firebase/auth";
//import { useNavigation } from "@react-navigation/native";
//import HomeScreen from "./HomeScreen";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
// Facebook and Apple icons URLs (you can replace with local assets too)
const facebookIcon =
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png";
const appleIcon =
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg";

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  // const navigation = useNavigation();
  const theme = {
    background: isDarkMode ? "#000" : "#fff",
    text: isDarkMode ? "#fff" : "#000",
    buttonBackground: isDarkMode ? "#1f1f1f" : "#f5f5f5",
    border: isDarkMode ? "#444" : "#ccc",
    oauthText: isDarkMode ? "#fff" : "#fff", // oauth buttons mostly white text
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const signInResult = await GoogleSignin.signIn();
      console.log("signin is ", signInResult);
      const idToken = signInResult.data?.idToken;
      console.log("Token is ", idToken);
      if (!idToken) {
        throw new Error("No ID token found");
      }
      const googleCreds = GoogleAuthProvider.credential(
        signInResult.data?.idToken
      );
      // should be resolved in the firebase console
      console.log("Google creds:", googleCreds);
      const userCreds = await signInWithCredential(getAuth(), googleCreds);
      console.log("User creds ", userCreds);
      console.log("User is ", getAuth().currentUser);
      setTimeout(async () => {
        await signOut(getAuth());
        console.log("User is ", getAuth().currentUser);
      }, 5000);
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      Alert.alert("Login Failed", error.message || "Unknown error");
    }
  };

  // Placeholder for Facebook login logic
  const handleFacebookLogin = () => {
    Alert.alert("Facebook Sign-In", "Facebook login not implemented yet.");
  };

  // Placeholder for Apple login logic
  const handleAppleLogin = () => {
    Alert.alert("Apple Sign-In", "Apple login not implemented yet.");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Welcome to MyApp
      </Text>

      {/* Google Sign-In */}
      <Pressable
        style={[
          styles.googleButton,
          {
            backgroundColor: theme.buttonBackground,
            borderColor: theme.border,
          },
        ]}
        onPress={handleGoogleLogin}
      >
        <View style={styles.buttonContent}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
            style={styles.icon}
          />
          <Text style={[styles.googleText, { color: theme.text }]}>
            Sign in with Google
          </Text>
        </View>
      </Pressable>

      {/* Facebook Sign-In */}
      <Pressable
        style={[styles.oauthButton, { backgroundColor: "#1877F2" }]}
        onPress={handleFacebookLogin}
      >
        <View style={styles.buttonContent}>
          <Image source={{ uri: facebookIcon }} style={styles.oauthIcon} />
          <Text style={styles.oauthText}>Sign in with Facebook</Text>
        </View>
      </Pressable>

      {/* Apple Sign-In */}
      <Pressable
        style={[
          styles.oauthButton,
          {
            backgroundColor: isDarkMode ? "#fff" : "#000",
          },
        ]}
        onPress={handleAppleLogin}
      >
        <View style={styles.buttonContent}>
          <Image
            source={{ uri: appleIcon }}
            style={[
              styles.oauthIcon,
              { tintColor: isDarkMode ? "#000" : "#fff" },
            ]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.oauthText,
              {
                color: isDarkMode ? "#000" : "#fff",
              },
            ]}
          >
            Sign in with Apple
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
  googleButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleText: {
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
  oauthButton: {
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  oauthText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  oauthIcon: {
    width: 20,
    height: 20,
  },
});
