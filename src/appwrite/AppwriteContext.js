import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
import Appwrite from "./service";

export const AppwriteContext = createContext({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
export const AppwriteProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;

const styles = StyleSheet.create({});
