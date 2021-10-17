import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function SectionHeader({ headerText, buttonText, onPress }) {
  return (
    <View style={[styles.row, styles.container]}>
      <AppText size="medium" fontWeight="bold" style={styles.black}>
        {headerText}
      </AppText>
      <AppText
        size="medium"
        fontWeight="medium"
        style={{ color: colors.primary }}
        onPress={() => {
          onPress();
        }}
      >
        {buttonText}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
  },
  black: {
    color: colors.black,
    fontWeight: "bold",
  },
});
export default SectionHeader;
