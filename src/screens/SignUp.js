import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
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
const Signup = ({ navigation }) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const usernameInputRef = useRef(null);
  useEffect(() => {
    usernameInputRef.current.focus();
  }, [name]);
  const handleSignUp = () => {
    if (name.length < 1 || email.length < 1 || password.length < 1) {
      setError("All Fields are required");
    } else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
        .createAccount(user)
        .then((response) => {
          setIsLoggedIn(true);
          console.log("Sign Up Successfull");
          Alert.alert(
            "Sign In Successful",
            "You have successfully signed in.",
            [
              {
                text: "OK",
              },
            ]
          );
        })
        .catch((e) => {
          setError(e.message);
          console.log(error + "from signup");
          Alert.alert("Sign In UnSuccessful", [
            {
              text: "OK",
            },
          ]);
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
            <FontAwesome
              name="user"
              size={24}
              color="purple"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter Your Name"
              placeholderTextColor="#A9A9A9"
              ref={usernameInputRef}
            />
          </View>
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
              onChangeText={(text) => {
                setEmail(text);
                console.log(text);
              }}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
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
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              console.log("hello there");
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signUpText}>
              Already have an account? SignIn
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
    marginTop: "15%",
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

export default Signup;
// const user = {
//   name: name,
//   email: email,
//   password: password,
// };

// axios
//   .post("http://localhost:8000/register", user)
//   .then((response) => {
//     console.log(response);
//     Alert.alert(
//       "Registration Successfully",
//       "You have registered successfully"
//     );
//     setName("");
//     setPassword("");
//     setEmail("");
//   })
//   .catch((error) => {
//     Alert.alert(
//       "Registration Error",
//       "an error occurred during registration"
//     );
//     console.log("registration failed", error);
//   });
