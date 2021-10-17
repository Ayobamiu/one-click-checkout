import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItemDeleteAction({ onDelete }) {
  const onPress = () => {
    Alert.alert("Delete", "Are you sure you want to delete this product?", [
      { text: "Yes", onPress: () => onDelete() },
      { text: "No" },
    ]);
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="trash-can" size={35} color={colors.white} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 100,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ListItemDeleteAction;
