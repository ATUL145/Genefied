import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppwriteContext } from "../appwrite/AppwriteContext";
import Loading from "../components/Loading";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
export const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then((response) => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch((_) => {
        setIsLoading(false);
        setIsLoading(false);
      });
  }, [appwrite, setIsLoggedIn]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
