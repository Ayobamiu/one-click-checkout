import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";

function AppCheckBox({
  title,
  onPress = () => {},
  defaultChecked = false,
  style,
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => {
          setChecked(!checked);
          onPress(!checked);
        }}
        style={[styles.row]}
      >
        <View
          style={[styles.checkBox, checked ? styles.checked : styles.unchecked]}
        >
          {checked && (
            <MaterialCommunityIcons name="check" color={colors.white} />
          )}
        </View>
        <AppText style={styles.title} size="input">
          {title}
        </AppText>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  checkBox: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: colors.gray3,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    backgroundColor: colors.primary,
  },
  container: {
    width: "100%",
  },
  title: {
    color: colors.medium,
    fontSize: 14,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  unchecked: {
    backgroundColor: colors.white,
  },
});
export default AppCheckBox;
