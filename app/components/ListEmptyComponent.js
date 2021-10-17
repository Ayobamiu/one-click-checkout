import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";

function ListEmptyComponent({
  text,
  buttonText,
  onPress,
  visible = true,
  iconComponent,
}) {
  const { height, width } = useWindowDimensions();
  if (!visible) return null;
  return (
    <View style={[styles.container, { width: width - 20 }]}>
      {iconComponent}
      <AppText size="medium" style={styles.text}>
        {text}
      </AppText>
      {buttonText && (
        <AppButton
          title={buttonText}
          onPress={onPress}
          // secondary
          small
          fullWidth={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  text: {
    // fontWeight: "bold",
    textAlign: "center",
    color: colors.light,
    marginVertical: 8,
  },
});
export default ListEmptyComponent;
