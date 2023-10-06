import React from "react";
import { StyleSheet } from "react-native";
import { Router } from "./src/routes/Router";
import { ToastProvider } from "react-native-toast-message";
export default function App() {
  return (
    <>
      <Router />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
