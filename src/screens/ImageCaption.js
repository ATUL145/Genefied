import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ImageCaption = ({ uri, route }) => {
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Imageuri = route.params?.uri;
  const navigation = useNavigation();

  const handleCaptionSubmit = () => {
    // Navigate to the "History" screen with the imageUri and caption as route params
    navigation.navigate("History", {
      imageUri: Imageuri,
      caption: caption,
    });
  };

  console.log("🚀 ~ file: ImageCaption.js:28 ~ ImageCaption ~ uri:", uri);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.imageContainer}>
          {Imageuri ? (
            <Image source={{ uri: Imageuri }} style={styles.image} />
          ) : (
            <Text>Placeholder Image</Text>
          )}
        </View>
      )}

      <TextInput
        placeholder="Enter Image Caption"
        style={styles.captionInput}
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleCaptionSubmit}>
        <Text style={styles.buttonText}>Submit Caption</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  captionInput: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ImageCaption;
