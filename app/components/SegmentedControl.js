import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function SegmentedControl({ data, onPress }) {
  const [index, setIndex] = useState(0);

  return (
    <View style={[styles.container, styles.rounded]}>
      {data.map((button, i) => (
        <TouchableOpacity
          style={[styles.button, i === index && styles.selected]}
          key={i}
          onPress={() => {
            setIndex(i);
            onPress(button);
          }}
        >
          <AppText size="x-small" fontWeight="medium">
            {button.name}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.grey,
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 2,
    height: 50,
  },
  rounded: { borderRadius: 100 },
  selected: {
    borderRadius: 100,
    backgroundColor: colors.white,
    height: "100%",
  },
});
export default SegmentedControl;
