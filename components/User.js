import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppwriteContext } from "../src/appwrite/AppwriteContext";
import Loading from "../src/components/Loading";
import { FontAwesome } from "@expo/vector-icons";

const UserProfile = ({ navigation }) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [user, setUser] = useState(null);
  const randomId = Math.floor(Math.random() * 100);
  useEffect(() => {
    appwrite.getCurrentUser().then((response) => {
      if (response) {
        setUser(response);
      }
    });
  }, [appwrite]);

  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.card}>
            <Text style={styles.text}>Name: {user.name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>{`ID:${randomId}`}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "purple",
    borderRadius: 50,
    padding: 10,
  },
});

export default UserProfile;
