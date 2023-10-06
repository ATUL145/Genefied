import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppwriteContext } from "../appwrite/AppwriteContext";
import Toast from "react-native-toast-message";
const Login = ({ navigation }) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);
  useEffect(() => {
    emailInputRef.current.focus();
  }, [email]);

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError("All fields are required");
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then((response) => {
          if (response) {
            console.log("🚀 ~ file: Login.js:40 ~ .then ~ response:", response);
            setIsLoggedIn(true);

            Alert.alert(
              "Log in Successful",
              "You have successfully Logged in.",
              [
                {
                  text: "OK",
                },
              ]
            );
            navigation.navigate("HomeTab");
          } else {
            setError("Incorrect Email or Password");
            Alert.alert(`${error}`, [
              {
                text: "OK",
              },
            ]);
          }
        })
        .catch((e) => {
          console.log("error from login.js is" + e);
          setEmail("Incorrect Email or Password");
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/Genefied.jpg")}
            style={styles.logo}
          />

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={24}
              color="purple"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              ref={emailInputRef}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={24}
              color="purple"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Keep me Logged In</Text>
            <Pressable>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              console.log("hello there");
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.signUpText}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: "35%",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
  },
  loginButton: {
    backgroundColor: "purple",
    marginTop: 20,
    height: 40,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  forgotPassword: {
    color: "blue",
  },
  signUpText: {
    color: "blue",
    marginTop: 10,
  },
});

export default Login;
