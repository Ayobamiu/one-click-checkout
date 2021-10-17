import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function AppTextInput({
  icon,
  placeholder,
  rounded,
  onChangeText,
  onPressShowPassword = () => {},
  showPasswordText,
  showPasswordButton = false,
  style,
  ...otherProps
}) {
  return (
    <View>
      <View
        style={[styles.container, rounded ? styles.rounded : styles.box, style]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.light}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={colors.gray3}
          style={[styles.placeHolderText, styles.full_width]}
          {...otherProps}
          onChangeText={onChangeText}
          placeholder={placeholder}
          textAlignVertical={otherProps.multiline && "top"}
        />
        {showPasswordButton && (
          <AppText
            size="medium"
            fontWeight="medium"
            style={styles.showPassword}
            onPress={onPressShowPassword}
          >
            {showPasswordText}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 8 },
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.gray,
    paddingHorizontal: 20,
  },
  full_width: { flex: 1 },
  icon: {
    marginRight: 10,
  },
  placeHolderText: {
    fontSize: 16,
  },
  text: {
    color: colors.medium,
    fontSize: 12,
  },
  rounded: { borderRadius: 100 },
  showPassword: { color: colors.primary },
});
export default AppTextInput;
