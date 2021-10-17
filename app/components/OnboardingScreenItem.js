import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import colors from "../config/colors";

function OnboardingScreenItem({ iconName, title }) {
  return (
    <View style={styles.container}>
      <Feather name={iconName} size={172} color="white" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    textAlign: "center",
  },
});
export default OnboardingScreenItem;
