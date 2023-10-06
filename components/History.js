import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

function History(props) {
  const route = useRoute();

  const [imageData, setImageData] = React.useState([]);

  const addNewImage = React.useCallback(async (imageUri, caption = "") => {
    const newImageData = {
      id: new Date().getTime().toString(),
      imageUri,
      caption,
      liked: false,
    };

    const prevData = await AsyncStorage.getItem("imageData");

    const prevImageData = prevData ? JSON.parse(prevData) : [];

    setImageData((prevData) => [newImageData, ...prevData]);

    AsyncStorage.setItem(
      "imageData",
      JSON.stringify([newImageData, ...prevImageData])
    );
  }, []);

  React.useEffect(() => {
    // Function to retrieve stored image data
    const retrieveImageData = async () => {
      try {
        const data = await AsyncStorage.getItem("imageData");
        if (data !== null) {
          setImageData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error retrieving image data: ", error);
      }
    };

    // Call the function to retrieve image data when the component mounts
    retrieveImageData();
  }, []);

  React.useEffect(() => {
    if (route.params?.imageUri) {
      addNewImage(route.params.imageUri, route.params.caption);
    }
  }, [route.params, addNewImage]);
  const removeCard = (id) => {
    const updatedImageData = imageData.filter((item) => item.id !== id);
    setImageData(updatedImageData);
    AsyncStorage.setItem("imageData", JSON.stringify(updatedImageData));
  };

  const toggleLike = (id) => {
    setImageData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      ) : (
        <Text>Placeholder Image</Text>
      )}

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <FontAwesome
            name={item.liked ? "heart" : "heart-o"}
            size={24}
            color={item.liked ? "red" : "purple"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Shared")}>
          <SimpleLineIcons name="share" size={24} color="purple" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Shared")}>
          <FontAwesome name="comment" size={24} color="purple" />
        </TouchableOpacity>
      </View>

      <Text style={styles.caption}>{item.caption}</Text>

      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => removeCard(item.id)}
      >
        <FontAwesome name="times-circle" size={24} color="purple" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8957E8", "#FFFFFF"]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <FlatList
          data={imageData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    alignItems: "center",
    position: "relative",
  },

  closeIcon: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 1,
  },
});

export default History;
