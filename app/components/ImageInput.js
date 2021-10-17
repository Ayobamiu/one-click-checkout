import React, { useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native";

function ImageInput({ imageUri, onChangeImage, rounded = false }) {
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the Library");
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result);
    } catch (error) {
      console.log("Error reading an Image", error);
    }
  };
  const handlePress = () => {
    if (!imageUri?.uri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, rounded ? styles.rounded : styles.box]}>
        {!imageUri?.uri ? (
          <MaterialCommunityIcons
            name="camera"
            color={colors.medium}
            size={40}
          />
        ) : null}
        {imageUri?.uri ? (
          <Image source={{ uri: imageUri?.uri }} style={styles.image} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  box: { borderRadius: 15 },
  container: {
    width: 120,
    height: 120,
    backgroundColor: colors.grey,

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rounded: {
    borderRadius: 60,
  },
});
export default ImageInput;
