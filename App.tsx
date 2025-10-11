import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import LoginScreen from "./screens/Login";
import { ClientId } from "@env";
//import { Navigation } from "./navigation/StackNavigator";

export default () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: ClientId,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
    // <Navigation />
  );
};
