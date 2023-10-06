import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import Login from "../screens/Login";
import Signup from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import ImageCaption from "../screens/ImageCaption";
const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="ImageCaption" component={ImageCaption} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
