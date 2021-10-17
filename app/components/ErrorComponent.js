import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";

function ErrorComponent({
  error,
  instruction,
  buttonTitle,
  onPress = () => {},
  iconComponent,
}) {
  return (
    <View style={styles.container}>
      {iconComponent}
      <AppText
        size="medium"
        fontWeight="medium"
        style={[styles.black, styles.textCenter, styles.mv16]}
      >
        {error}
      </AppText>
      <AppText
        size="x-small"
        fontWeight="medium"
        style={[styles.faintColor, styles.textCenter, styles.mv16]}
      >
        {instruction}
      </AppText>
      {buttonTitle && (
        <AppButton
          title={buttonTitle}
          style={styles.button}
          fullWidth
          onPress={onPress}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  black: { color: colors.black },
  button: { bottom: 20, position: "absolute" },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 30,
  },
  faintColor: {
    color: colors.medium,
  },
  mv16: {
    marginVertical: 16,
  },
  textCenter: {
    textAlign: "center",
  },
});
export default ErrorComponent;
