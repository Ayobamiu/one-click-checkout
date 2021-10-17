import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default useImage = () => {
  let error = false;
  let image = null;

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
      if (!result.cancelled) {
        image = result;
      }
    } catch (error) {
      error = true;
    }
    return { image, error };
  };
  return { selectImage };
};
