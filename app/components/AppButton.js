import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({
  fullWidth = false,
  disabled = false,
  small = false,
  secondary = false,
  title,
  onPress = () => {},
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        small ? styles.small : styles.big,
        fullWidth && styles.width100,
        secondary && styles.secondaryButton,
        disabled && styles.opaque,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  big: {
    padding: 16,
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  opaque: { opacity: 0.5 },
  secondaryButton: {
    backgroundColor: colors.transparent,
    elevation: 0,
  },
  secondaryText: {
    color: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  small: {
    padding: 8,
    paddingHorizontal: 16,
  },
  width100: {
    width: "100%",
  },
});
export default AppButton;
