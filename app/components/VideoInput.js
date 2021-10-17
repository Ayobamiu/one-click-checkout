import React, { useEffect } from "react";
import { View, StyleSheet, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function VideoInput({ videoUri, onChangeVideo, style }) {
  const video = React.useRef(null);
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the Library");
  };
  const selectImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: false,
      });
      if (result.type !== "cancel") onChangeVideo(result);
    } catch (error) {}
  };
  const handlePress = () => {
    if (!videoUri?.uri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this video?", [
        { text: "Yes", onPress: () => onChangeVideo(null) },
        { text: "No" },
      ]);
  };
  return (
    <>
      <Pressable style={[styles.row, style]} onPress={handlePress}>
        {videoUri?.uri ? (
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={colors.medium}
            size={30}
          />
        ) : (
          <MaterialCommunityIcons
            name="video-plus"
            color={colors.medium}
            size={30}
          />
        )}
        <AppText size="medium" fontWeight="bold" style={styles.medium}>
          {videoUri?.uri ? "Delete Video File" : "Select Video File"}
        </AppText>
      </Pressable>
      {videoUri?.uri ? (
        <Video
          ref={video}
          style={[styles.video, styles.mv10]}
          source={{
            uri: videoUri?.uri,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  medium: {
    color: colors.medium,
    marginLeft: 10,
  },
  mv10: {
    marginVertical: 10,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: colors.light,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default VideoInput;
