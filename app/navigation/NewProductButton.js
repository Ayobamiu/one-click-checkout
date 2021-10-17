import React from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

function NewProductButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={40} color={colors.white} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 40,
    borderColor: colors.white,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
});
export default NewProductButton;
