import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function CopyProductLink(props) {
  return (
    <View style={styles.swipeLeft}>
      <AppText size="medium" fontWeight="bold" style={styles.white}>
        Link Copied!
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  swipeLeft: {
    width: 200,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  white: { color: colors.white },
});
export default CopyProductLink;
