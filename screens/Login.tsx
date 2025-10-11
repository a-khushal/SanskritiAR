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
//import HomeScreen from "./HomeScreen";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";

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
    oauthText: isDarkMode ? "#fff" : "#fff",
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const signInResult = await GoogleSignin.signIn();
      // console.log("signin is ", signInResult);
      const idToken = signInResult.data?.idToken;
      //console.log("Token is ", idToken);
      if (!idToken) {
        throw new Error("No ID token found");
      }
      const googleCreds = GoogleAuthProvider.credential(
        signInResult.data?.idToken
      );

      //console.log("Google creds:", googleCreds);
      const userCreds = await signInWithCredential(getAuth(), googleCreds);
      //console.log("User creds ", userCreds);
      //console.log("User is ", getAuth().currentUser);
      setTimeout(async () => {
        await signOut(getAuth());
        // console.log("User is ", getAuth().currentUser);
      }, 5000);
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      Alert.alert("Login Failed", error.message || "Unknown error");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Welcome to SanskritiAR
      </Text>

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
