import React from "react";
import { StyleSheet, Text } from "react-native";
// import {
//   useFonts,
//   Inter_600SemiBold,
//   Inter_500Medium,
//   Inter_400Regular,
// } from "@expo-google-fonts/inter";

function AppText({
  children,
  size,
  fontWeight,
  style: extraStyle,
  onPress,
  ...props
}) {
  // let [fontsLoaded] = useFonts({
  //   Inter_600SemiBold,
  //   Inter_500Medium,
  //   Inter_400Regular,
  // });

  // let weight = null;
  // if (fontsLoaded) {
  //   weight =
  //     fontWeight === "bold"
  //       ? "Inter_600SemiBold"
  //       : fontWeight === "medium"
  //       ? "Inter_500Medium"
  //       : "Inter_400Regular";
  // }

  const textSize =
    size === "large"
      ? 30
      : size === "header"
      ? 24
      : size === "medium"
      ? 16
      : size === "x-small"
      ? 14
      : size === "input"
      ? 12
      : 10;

  const style = {
    fontSize: textSize,
  };
  // if (weight) {
  //   style.fontFamily = weight;
  // }
  return (
    <Text style={[style, extraStyle]} {...props} onPress={onPress}>
      {children}
    </Text>
  );
}

export default AppText;
